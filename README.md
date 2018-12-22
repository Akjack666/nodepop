#nodepop


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

Internacionalizacion


En el directorio /locales, se pueden añadir las variables para ingles o castellano, o definir en .app, i18n.configure, nuevos idiomas
