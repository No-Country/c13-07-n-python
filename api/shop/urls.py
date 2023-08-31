from django.urls import path
from shop.views import CartAPIView, CartItemAPIView, ProductAPIView

urlpatterns = [
    path('cart/', CartAPIView.as_view(), name='cart_view'),
    path('cart_item/', CartItemAPIView.as_view(), name='cart_item_view'),
    path('product/', ProductAPIView.as_view(), name='product_view'),
]
