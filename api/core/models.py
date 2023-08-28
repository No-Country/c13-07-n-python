from django.db import models
from django.contrib.auth.models import ( AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Falta email')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        if 'birthday' in extra_fields:
            extra_fields.pop('birthday')
        user = self.create_user(email=email, password=password, is_staff=True, is_superuser=True, **extra_fields)
        user.save(using=self._db)

        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    birthday = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)
    verified_account = models.BooleanField(default=False)
    verification_code = models.PositiveIntegerField(null=True, blank=True, default=None)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def save(self, *args, **kwargs):
        # Verificar si el usuario creado es un superuser
        is_new_user = not self.pk
        if is_new_user:
            if self.is_superuser:
                self.birthday = None

            if not self.is_superuser: # Si el usuario creado no es un superuser se procede a encriptar la contraseña (Por defecto, al superuser se le encripta la contraseña)
                self.set_password(self.password)
        else:
            # Verificar si la contraseña ha sido modificada y si lo fue, volver a encriptarla.
            try:
                obj = self.__class__.objects.get(pk=self.pk)
                if obj.password != self.password:
                    self.set_password(self.password)
            except self.DoesNotExist:
                pass
        return super().save(*args, **kwargs)


class Shipping(models.Model):
    address = models.CharField(max_length=50)
    country = models.CharField(max_length=20)
    phone = models.BigIntegerField()
    zip_code = models.CharField(max_length=10)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Payment(models.Model):
    number = models.BigIntegerField()
    valid_thru = models.DateField()
    cvv = models.SmallIntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)