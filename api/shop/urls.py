from django.urls import path
from shop import views

urlpatterns = [
    path('purchase/', views.PurchaseAPIView.as_view(), name='purchase_view'),
    path('cart_item/', views.CartItemAPIView.as_view(), name='cart_item_view'),
    path('product/', views.ProductAPIView.as_view(), name='product_view'),




    # ------------------cart------------------
    path('create-user-cart/<int:id>/',
         views.CreateCartView.as_view(), name='create_cart'),
    path('add-to-cart/', views.AddToCartView.as_view(), name='add_to_cart')
]
