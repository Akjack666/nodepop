# Nodepop

## Arranques

Configurar variables de entorno. Hacer una copia del fichero .env.example a .env y modificar los valores de configuración.


Creacion de anuncios y usuario DEMO:

```shell
npm run install_db.js
```

Arrancar la aplicación en modo desarrollo:

```shell
npm run dev
```

Arrancar la aplicación en modo cluster:

```shell
npm run cluster
```

Recordatorio: Para arrancar el servidor de MongoDB: 

```shell
bin/mongod --dbpath ./data/db --directoryperdb
```


## Usuarios

Para introducir un nuevo usuario, se realizara un post pasando los datos del nuevo usuario:

```
http://tu_direccion/apiv1/usuarios/
```

* Para hacer login, deberemos hacer post en la siguiente url, pasandole el email y la clave, lo que nos devolvera un token
* La clave se encriptara en la base de datos, y se desencriptara al hacer el login

```
http://tu_direccion/apiv1/usuarios/login
```

Al final de la url, junto con jwttoken='token', tendremos acceso , por ejemplo:

```
http://localhost:3000/apiv1/anuncios?&jwttoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWMxZTc1MTA4ZTZmOTQ0YTc4ZmE0ZGNlIiwiaWF0IjoxNTQ1NTAwMTgwLCJleHAiOjE1NDU2NzI5ODB9.Jegb04kzkV_apTqTG59qa24UnUzhD076utRw94knLJc
```

## Filtros


### Por inicio de nombre:
Ejemplo:

``` 
http://localhost:3000/apiv1/anuncios?nombre=bici&jwttoken=token
```

### Por Tags:
Ejemplo:
```
http://localhost:3000/apiv1/anuncios?tag=motor&jwttoken=token`
```

### Tipo de anuncio:

Pasaremos un booleano indicando si se vende (true), o de lo contrario, se busca (false)

```
http://localhost:3000/apiv1/anuncios?venta=true&jwttoken=token
```

### Por rango de precios:

* **10-50** Productos en el rango de 10 y 50

Ejemplo:

```
http://localhost:3000/apiv1/anuncios?precio=10-50&jwttoken=token
```

* **10-** Productos con precio mayor a 10

Ejemplo:
```
http://localhost:3000/apiv1/anuncios?precio=10-&jwttoken=token
```

* **-50** Productos con precio menor a 50

Ejemplo:
```
http://localhost:3000/apiv1/anuncios?precio=-50&jwttoken=token
```

* **50** Productos con un precio exacto de 50

Ejemplo:
```
http://localhost:3000/apiv1/anuncios?precio=50&jwttoken=token
```


### Paginación

Podremos indicar cuantos productos se mostraran y de cuanto sera el salto, en caso de mostrarlos en varias paginas

Ejemplo:
Con el ejemplo mostrariamos solo uno, y saltariamos los 2 primeros

```
localhost:3000/apiv1/anuncios?limit=1&skip=2&jwttoken=token
```

Para ordenar, utilizaremos sort
Ejemplo que ordena por precio:

```
http://localhost:3000/apiv1/anuncios?sort=precio&jwttoken=token
```


### Internacionalización


En el directorio /locales, se pueden añadir las variables para ingles o castellano, o definir en .app, i18n.configure, nuevos idiomas

### URLs

Pagina web: https://www.danirica.es/
Nodepop: https://nodepop.danirica.es/

### Imagen de prueba

https://nodepop.danirica.es/images/anuncios/bici.png
