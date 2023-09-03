from django.urls import path
from shop.views import CartItemAPIView, ProductAPIView, PurchaseAPIView

urlpatterns = [
    path('purchase/', PurchaseAPIView.as_view(), name='purchase_view'),
    path('cart_item/', CartItemAPIView.as_view(), name='cart_item_view'),
    path('product/', ProductAPIView.as_view(), name='product_view'),
]
