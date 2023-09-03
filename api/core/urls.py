from django.urls import path
from core import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('get-rol/<int:id>/', views.RolView.as_view(), name='home'),
    path('get-user/<int:id>/', views.GetCustomerView.as_view()),
    path('get-staff/<int:id>/', views.GetStaffView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('register-user/', views.RegisterUser.as_view(), name='register-student'),
    path('update-user/', views.UpdateUserView.as_view(), name='update-user'),
    path('send-email/', views.SendEmailView.as_view()),
    path('verify-user/<int:id>/<str:token>/', views.VerifyAccountView.as_view()),
    path('password-reset/', views.PasswordResetView.as_view()),
    path('password-reset/confirm/<int:id>/<str:token>/', views.PasswordResetValidateView.as_view(), name='password-reset-confirm'),



    #----------------------PAYMENT----------------
    path('get-user-payment/<int:id>/', views.GetPaymentView.as_view(), name='payments')
]