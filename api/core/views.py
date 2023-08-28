from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from rest_framework import status, serializers
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from core.serializers import UserSerializer, CustomTokenObtainPairSerializer
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import default_token_generator
from .models import User
from password_validator import PasswordValidator
from django.core.exceptions import ObjectDoesNotExist
import random

def generate_verification_code():
    return random.randint(1000, 9999)

# Create your views here.

schema = PasswordValidator()
schema \
.min(8)\
.max(100)\
.has().uppercase()\
.has().lowercase()\
.has().digits()\
.has().no().spaces()\

class RegisterUser(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Obtener la nueva contraseña del cuerpo de la solicitud
            password = request.data.get('password')
            is_valid_password = schema.validate(password)

            if not is_valid_password:
                error_message = 'La contraseña debe cumplir los siguientes requisitos:\n' \
                                '• Debe tener al menos 8 caracteres.\n' \
                                '• Debe contener al menos una mayúscula.\n' \
                                '• Debe contener al menos una minúscula.\n' \
                                '• Debe contener al menos un número.\n' \
                                '• No debe contener espacios.'
                return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
            
            verification_code = generate_verification_code()
            user = serializer.save(verification_code=verification_code)

            group_name = 'Customer'  # Nombre del grupo "Customer"
            group = Group.objects.get(name=group_name)
            user.groups.add(group)

            success_message = "Usuario registrado exitosamente."
            return Response({'message': success_message}, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            errors = {}

            for field, error_messages in e.detail.items():
                errors[field] = error_messages[0] if isinstance(error_messages, list) else error_messages

            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'No se pudo registrar al usuario. Detalle del error: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

# Verificación de grupos
class RolView(APIView):
    """
    Filtra los usuarios según su grupo y devuelve una respuesta JSON.
    """
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        if user.groups.filter(name='Staff').exists():
            return Response({'message': 'Staff'}, status=status.HTTP_200_OK)
        elif user.groups.filter(name='Customer').exists():
            return Response({'message': 'Customer'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuario no tiene permisos para acceder a esta vista'}, status=status.HTTP_401_UNAUTHORIZED)
        
class GetUserView(generics.RetrieveAPIView):
    """
    Obtener un usuario por ID y grupo específico.
    """
    authentication_classes = [JWTAuthentication]
    serializer_class = UserSerializer
    group_name = None  # Nombre del grupo específico, debe ser establecido en las subclases

    def get_object(self):
        group = Group.objects.get(name=self.group_name)
        try:
            user_id = self.kwargs['id']  # asumiendo que 'id' es el nombre del parámetro en la URL
            user = group.user_set.get(pk=user_id)
            return user
        except group.DoesNotExist:
            raise Http404
        except User.DoesNotExist:
            raise Http404

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        serialized_data = serializer.data

        # Esto elimina los campos 'password', 'is_superuser', 'is_staff' del usuario en la respuesta JSON.
        serialized_data.pop('password', None)
        serialized_data.pop('is_superuser', None)
        serialized_data.pop('is_staff', None)

        return Response(serialized_data, status=status.HTTP_200_OK)

class GetCustomerView(GetUserView):
    """
    Obtener un usuario por ID.
    """
    group_name = 'Customer'

class GetStaffView(GetUserView):
    """
    Obtener un staff por ID.
    """
    group_name = 'Staff'

# Login y Logout
class Login(TokenObtainPairView):
    """
    Realiza la verificación de las credenciales. Luego genera los tokens correspondientes para devolverlos en la respuesta JSON.
    En caso contrario devolvera el error 'Email o Contraseña incorrectos.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        
        user = authenticate(
            username=email,
            password=password
        )

        if user and user.verified_account:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_serializer = UserSerializer(user)
                return Response({
                    'access': login_serializer.validated_data.get('access'),
                    'refresh-token': login_serializer.validated_data.get('refresh'),
                    'user': user_serializer.data,
                    'msg': 'Inicio de sesión exitoso.'
                }, status = status.HTTP_200_OK)
            return Response({'error': 'Email o Contraseña incorrectos.'}, status=status.HTTP_400_BAD_REQUEST)
        elif user:
            return Response({'error': 'La cuenta no está verificada.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Email o Contraseña incorrectos.'}, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    """
    Verifica si el usuario esta autenticado. 
    Si lo esta procede a agregar el 'refresh_token' a la blacklist. De manera que este ya no se puede utilizar para generar un nuevo 'access_token'
    """
    authentication_classes = [JWTAuthentication]

    # Al consumir la vista en el front, se debe enviar el access token y el refresh token para que estos se invaliden en el servidor. Finalmente debe borrarse el access token del cliente
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            # Eliminar las cookies 'access' y 'refresh' del navegador
            response = Response({'msg': 'Sesión finalizada correctamente'}, status=status.HTTP_200_OK)
            response.delete_cookie('access')
            response.delete_cookie('refresh')
            response.delete_cookie('sessionid')
            response.delete_cookie('csrftoken')
            return response
        except:
            return Response({'error': 'No se pudo invalidar el token'}, status=status.HTTP_400_BAD_REQUEST)

# Actualizar datos de un usuario.
class UpdateUserView(generics.UpdateAPIView):
    """
    Actualiza datos de un usuario.
    """
    authentication_classes = [JWTAuthentication]
    serializer_class = UserSerializer
    lookup_field = 'id' 

    def put(self, request, *args, **kwargs):
        try:
            user = request.user  # Obtener el usuario actual

            # Verificar si el usuario quiere cambiar la contraseña. Si es así, obtener la nueva contraseña del cuerpo de la solicitud
            if request.data.get('password'):
                password = request.data.get('password')
                is_valid_password = schema.validate(password)

                if not is_valid_password:
                    error_message = 'La contraseña debe cumplir los siguientes requisitos:\n' \
                                    '• Debe tener al menos 8 caracteres.\n' \
                                    '• Debe contener al menos una mayúscula.\n' \
                                    '• Debe contener al menos una minúscula.\n' \
                                    '• Debe contener al menos un número.\n' \
                                    '• No debe contener espacios.'
                    return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

            existing_user_email = User.objects.filter(email=request.data['email']).exclude(pk=user.pk).exists()
            errors = {}

            if existing_user_email:
                errors['email'] = 'El Email ya está registrado'

            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        
            return Response({'message': 'Usuario actualizado correctamente'},
                            status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'error': 'No se pudo actualizar el usuario'}, status=status.HTTP_400_BAD_REQUEST)

# Emails  
class SendEmailView(APIView):
    def post(self, request):
        email = request.data.get('email', '')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'El usuario no existe'}, status=404)
        
        token = default_token_generator.make_token(user)
        verify_account_url = f"http://localhost:5173/verificar-cuenta/{user.id}/{token}/"
        
        message = f'Hola {user.name},\n\n'
        message += 'Te damos la bienvenida a OTOÑO\n'
        message += 'Ya casi podes ingresar a la plataforma con tu email y contraseña.\n\n'
        message += 'Primeramente debes activar tu cuenta. Ingresa en el siguiente link.\n'
        message += f'{verify_account_url}\n\n'
        message += 'Ingresa el siguiente código de verificación.\n\n'
        message += f'{user.verification_code}\n\n'

        send_mail(
            'Bienvenido a OTOÑO!',
            message,
            'noreply@example.com',  # Cambia esto al remitente deseado
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Correo enviado correctamente'})
    
class VerifyAccountView(APIView):
    def post(self, request, id, token):
        try:
            user = User.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({'error': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        if default_token_generator.check_token(user, token):
            verification_code = request.data['verification_code']
            if verification_code['verification_code'] == user.verification_code:
                user.verified_account = True
                user.verification_code = None  # Vaciar el campo verification_code
                user.save()
                return Response({'message': 'Cuenta verificada exitosamente'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'El código de verificación no coincide'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email', '')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'No se encontró ningún usuario asociado a ese correo electrónico'}, status=404)
        
        verification_code = generate_verification_code()
        user.verification_code = verification_code
        user.save()

        token = default_token_generator.make_token(user)
        reset_password_url = f"http://localhost:5173/reestablecer-clave/{user.id}/{token}/"

        message = f'Hola {user.name},\n\n'
        message += 'Has solicitado restablecer tu contraseña. Puedes hacerlo a través del siguiente enlace:\n'
        message += f'{reset_password_url}\n\n'
        message += f'Tu código de verificación es: {verification_code}\n\n'
        message += 'Si no has solicitado restablecer tu contraseña, ignora este correo.\n\n'
        message += 'Gracias,\n'
        message += 'El equipo de OTOÑO'

        send_mail(
            'Restablecimiento de contraseña',
            message,
            'noreply@example.com',  # Cambia esto al remitente deseado
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Se ha enviado un correo para restablecer la contraseña'})
    
class PasswordResetValidateView(APIView):
    """
    Verifico el ID y el token para luego guardar la nueva contraseña
    """
    def post(self, request, id, token):
        # Verificar si el ID y el token son válidos
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'ID de usuario inválido'}, status=status.HTTP_404_NOT_FOUND)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST) 

        # Obtener el código de verificación y la nueva contraseña del cuerpo de la solicitud
        verification_code = request.data.get('verification_code')
        new_password = request.data.get('new_password')
        is_valid_password = schema.validate(new_password)
        
        # Verificar si el código de verificación coincide
        if verification_code != user.verification_code:
            return Response({'error': 'Código de verificación incorrecto'}, status=status.HTTP_400_BAD_REQUEST)

        if not is_valid_password:
            error_message = 'La contraseña debe cumplir los siguientes requisitos:\n' \
                            '• Debe tener al menos 8 caracteres.\n' \
                            '• Debe contener al menos una mayúscula.\n' \
                            '• Debe contener al menos una minúscula.\n' \
                            '• Debe contener al menos un número.\n' \
                            '• No debe contener espacios.'
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar la contraseña en el serializador del usuario
        user_data = {
            'password': new_password,
            'verification_code': None
        }
        serializer = UserSerializer(user, data=user_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message': 'Contraseña actualizada correctamente'})