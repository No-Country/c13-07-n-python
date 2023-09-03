from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Payment, User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.save()
        return user
    
    def update(self,instance, validated_data):
        user = super().update(instance, validated_data)
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

    def create(self, data):
        payment = Payment(**data)
        payment.save()
        return payment
