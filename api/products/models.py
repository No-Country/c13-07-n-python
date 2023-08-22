from django.db import models

from api.users.models import Payment, User

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places=2)
    stock = models.IntegerField()
    images_path = models.CharField(max_length=100)
    category = models.CharField(max_length=50)


class Purchase(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    purchased_products = models.JSONField()


class Cart(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField()
