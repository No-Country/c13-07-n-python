from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shop.serializers import CartSerializer

from core.models import User
from .models import Cart, CartItem, Product, Purchase
from shop.serializers import CartItemSerializer, ProductSerializer, PurchaseSerializer
import json


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


class AddToCartView(APIView):
    def post(self, request):
        cart_item_serializer = CartItemSerializer(data=request.data)
        if cart_item_serializer.is_valid():
            cart_item_serializer.save()
            return Response(cart_item_serializer.data, status=status.HTTP_201_CREATED)
        return Response(cart_item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCartView(APIView):
    def post(self, request, id):
        try:
            cart_serializer = CartSerializer()
            cart_serializer.create({'owner_id': id})
            return Response({'message': 'Carrito creado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'ID de usuario inválido'}, status=status.HTTP_404_NOT_FOUND)