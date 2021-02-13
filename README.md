# Webpack Starter
Configuración base para proyectos web basados en webpack.
> Fecha de creación: `13-02-2021`


# Instalación
Clonar el repositorio
```
git clone https://github.com/Estasleyendoesto/webpack-starter.git
```

Construir los módulos de node dentro del repositorio clonado
```
npm install
```
> Requiere instalar node dentro del SO


Construir el build descargando los paquetes necesarios
```
npm run build
```

Desarrollar 👌...
> El resto es webpack

#### Adicional:
Modo development 
```
npm start
```

Exportar `/dist` como producción (producto final para subir a la web)
```
npm run build:prod
```


## Dependencias
```js
"devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/preset-env": "^7.12.16",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^7.0.0",
    "css-loader": "^5.0.2",
    "css-minimizer-webpack-plugin": "^1.2.0",
    "file-loader": "^6.2.0",
    "html-loader": "^1.3.2",
    "html-webpack-plugin": "^5.0.0",
    "mini-css-extract-plugin": "^1.3.6",
    "style-loader": "^2.0.0",
    "terser-webpack-plugin": "^5.1.1",
    "webpack": "^5.21.2",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"
}
``` 
