from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CartItem, Product, Purchase
from shop.serializers import CartItemSerializer, ProductSerializer, PurchaseSerializer

class CartItemAPIView(APIView):
    def get(self, request):
        carts_items = CartItem.objects.all()
        carts_items_serializer = CartItemSerializer(carts_items, many=True)
        return Response(carts_items_serializer.data)

class ProductAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()
        products_serializer = ProductSerializer(products, many=True)
        return Response(products_serializer.data)

class PurchaseAPIView(APIView):
    def get(self, request):
        purchases = Purchase.objects.all()
        purchases_serializer = PurchaseSerializer(purchases, many=True)
        return Response(purchases_serializer.data)


