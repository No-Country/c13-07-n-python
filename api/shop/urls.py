from django.urls import path
from shop import views

urlpatterns = [

    path('product/', views.ProductAPIView.as_view(), name='product_view'),

]