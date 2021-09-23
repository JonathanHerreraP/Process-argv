// recibir argumentos por linea comandos con process.argv:
const argumentos = process.argv.slice(2);

let nombre_archivo = argumentos[0];
let indicador = argumentos[1];
let cantidad_pesos =(argumentos[2]);


// consulta a la API:
const https = require('https')
https
.get("https://mindicador.cl/api", (resp) => {
resp.on('data', (respuesta) => {

let datos =JSON.parse(respuesta)
let valor_dolar = datos.dolar.valor

//Obtener fecha actual:
let now = new Date();

//Template de contenido del archivo a crear:

let contenido = ("A la fecha:"+ now +" Fue realizada cotización con los siguientes datos: Cantidad de pesos a convertir: "+ cantidad_pesos +" pesos, Convertido a dólar da un total de:$"+(cantidad_pesos/valor_dolar));

//Modulo File System:

const fs = require("fs")
fs.writeFile(nombre_archivo, contenido, "utf8", ()=>{
    console.log("Archivo creado con éxito")
})

//Lee el archivo creado:
fs.readFile(nombre_archivo, "utf8", (err,data)=>{
    console.log(data)
})


})
})
.on('error', (err) => {
console.log('Error: ' + err.message) 

})

