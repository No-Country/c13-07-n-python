from faker import Faker
# from core.models import User


fake = Faker()
# u = User.objects.get(id=1)

# GENERAR DATOS FAKE CC

payment_data = []
for i in range(10):
    payment_record = {
        'number': fake.credit_card_number(),
        'valid_thru': fake.credit_card_expire(date_format='%Y/%m/%d'),
        'cvv': fake.credit_card_security_code()
    }

    payment_data.append(payment_record)

with open('payment.json', 'w') as fp:
    fp.writelines(payment_data.__str__())


# GENERAR DATOS DE USUARIO
# user = User

# user_data = []

# # for i in range(5):
# #     user_record = {
# #         'name': fake.first_name(),
# #         'last_name': fake.last_name(),
# #         'birthday': fake.date_of_birth(minimum_age=18).isoformat(),
# #         'email': fake.email(),
# #         'password': fake.password()
# #     }

# #     user_data.append(user_record)

# with open('user.json', 'w') as fp:
#     fp.writelines(user_data.__str__())
