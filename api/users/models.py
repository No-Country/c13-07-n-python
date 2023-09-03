from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthday = models.DateField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=150)


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
