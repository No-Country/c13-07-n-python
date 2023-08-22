# E-Commerce - Tienda de remeras
[Descripción]

## Instalación de python
Primero debemos asegurarnos de tener instalado [python](https://www.python.org/downloads/)

```bash
python --version
```
## Instalación de Librerias

Hacer uso de [pip](https://pip.pypa.io/en/stable/) para instalar librerias. 

* Verificar la version de pip:
```bash
pip --version
```

* Si es necesario, actualizar la version:
```bash
python.exe -m pip install --upgrade pip
```

## Clonar el proyecto

```bash
  git clone https://github.com/No-Country/c13-07-n-python.git
```

## Entorno virtual
La creación de un entorno virtual nos permitira trabajar con versiones de paquetes totalmente distintas a las instaladas en el sistema. Ya que las librerías solo seran instalas y usadas en el entorno virtual especificado.
De esta forma evitamos problemas de compatibilidad o la instalación de librerías en todo el sistema. Ya que muchas veces solo usaremos una librería especifica en un solo proyecto.
Además, podríamos tener la última versión de python en nuestro sistema, pero querer desarrollar con alguna versión anterior. Con el entorno virtual podremos hacerlo sin ningún problema. [Docs](https://virtualenv.pypa.io/en/latest/)

* Instalamos de forma local virtualenv
```bash
pip install virtualenv
```

* Dentro de la carpeta del proyecto, en api, creamos un entorno virtual
```bash
cd api
virtualenv venv
```

* Iniciamos el entorno virtual
```bash
source venv/Scripts/Activate
```

# Ejecutar el servidor localmente (API)

* Vamos al directorio del proyecto

```bash
  cd c13-07-n-python/api
```

* Instalar las dependencias

```bash
  pip install -r requirements.txt
```

* Verificamos la correcta instalación:
```bash
pip list
```
o
```bash
pip freeze
```

* Configuramos las variables de entorno. ".env.example" -> ".env"
```
SECRET_KEY = ''
MYSQL_HOST = ''
MYSQL_PORT = ''
MYSQL_USER = ''
MYSQL_PASSWORD = ''
MYSQL_NAME = ''
```

* Realizamos las migraciones
```bash
  python manage.py makemigrations
  python manage.py migrate
```

* Iniciamos el servidor

```bash
  python manage.py runserver
```

# Ejecutar el cliente localmente

* Vamos al directorio del proyecto

```bash
  cd c13-07-n-python/client
```

* Instalar las dependencias

```bash
  npm install
```

* Iniciamos el cliente

```bash
  npm run dev
```