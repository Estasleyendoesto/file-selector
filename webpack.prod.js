
const path                      = require('path');
const HtmlWebPackPlugin         = require("html-webpack-plugin");
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const CssMinimizerPlugin        = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const TerserPlugin              = require("terser-webpack-plugin");
const CopyPlugin                = require("copy-webpack-plugin");

module.exports = {

    mode: "production",    // development | production
    performance: {
        hints: 'warning'
    },
    optimization: {
        minimize: true,     // "true" solo para producción, "false" para development
        minimizer: [ 
            new CssMinimizerPlugin(),   // Minimizador de CSS
            new TerserPlugin({          // Minimizador de JS
                parallel: true,         // Proceso en multihilo
                //terserOptions: {}
            }) 
        ]
    },
    output: {
        pathinfo: false,
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // Reglas para el fichero css
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                          modules: true
                        }
                    }
                ]
            },
            // Reglas para el fichero principal css "styles.css"
            {
                test: /styles\.css$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            // Reglas para los ficheros html
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    attributes: false,
                    minimize: true      // Comprime el html
                },
            },
            // Reglas para copiar cualquier tipo de fichero
            {
                test: /\.(png|jpg|gif|svg)$/i,  // Cualquier archivo (no html, css, js) se añade aquí
                loader: "file-loader",
                options: {
                    esModule: false
                },
            },
            // Uso de Babel para compatibilidad de Javascript con navegadores antiguos
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",   // Ubicación del fichero original
            filename: "./index.html"        // Nueva ubicación dentro de /dist
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",         // "[name].[contenthash].css" para producción
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/img", to: "./img"}   // Insertamos nuevas reglas para transferir carpetas y ficheros - origen(src) | destino(dist)
            ]
        })
    ],
    devServer: {
        contentBase: './dist',
    },
}