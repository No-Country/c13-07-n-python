from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from .models import Product
from shop.serializers import ProductSerializer



class ProductAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()
        products_serializer = ProductSerializer(products, many=True)
        return Response(products_serializer.data)