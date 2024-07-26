
let saldoUsuario = 0
let productos = [
    { id: 25, producto: "Chance", precio: 3500, sorteo: "La Culona día", premio: 10000000 },
    { id: 2, producto: "Super Astro", precio: 1500, sorteo: "Astro Luna", premio: 26000000 },
    { id: 15, producto: "Billonario 4C", precio: 5000, sorteo: "El Siriano", premio: 36500000 },
    { id: 7, producto: "Lotería", precio: 3000, sorteo: "Del Huila", premio: 96000000 },
    { id: 9, producto: "Play 4C", precio: 6000, sorteo: "Boyacá", premio: 65000000 }
]

function validacionDeRegistroN() {
    let idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
    let creacionContraseñaUsuario = prompt("Ingresa una contraseña:")

    while (idCreacionUsuario.length < 4) {
        alert("El nombre debe tener al menos 4 caracteres. Por favor, ingresa un nombre válido.")
        idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
    }

    while (creacionContraseñaUsuario.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres. Por favor, ingresa una contraseña válida.")
        creacionContraseñaUsuario = prompt("Ingresa una contraseña:")
    }

    alert("Registro exitoso. Ahora puedes acceder a la interfaz de usuario.")


    interfazUsuario({ nombre: idCreacionUsuario, contraseña: creacionContraseñaUsuario })
}

function validacionDeRegistroS(usuarioIngresado) {
    let idUsuario = prompt("Ingresa tu nombre de ingreso:")
    let contraseñaUsuario = prompt("Ingresa tu contraseña para ingresar:")

    if (idUsuario === usuarioIngresado.nombre && contraseñaUsuario === usuarioIngresado.contraseña) {
        alert("Ahora puedes acceder a la interfaz de usuario.")
        interfazUsuario(usuarioIngresado, saldoUsuario)
    } else {
        let continuarRegistro = prompt("Aún no te encuentras registrado. ¿Deseas continuar con el registro?: S/N").toUpperCase()
        while (continuarRegistro !== "N" && continuarRegistro !== "S") {
            alert("Por favor, ingresa S para sí o N para no.")
            continuarRegistro = prompt("¿Deseas continuar con el registro?: S/N").toUpperCase()
        }
        if (continuarRegistro === "S") {
            validacionDeRegistroN()
        } else {
            alert("No se realizó el registro. Puedes volver a intentar más tarde.")
        }
    }
}


function interfazUsuario(usuarioIngresado) {

    let interfazInteractiva = prompt(`Bienvenido/a, ${usuarioIngresado.nombre}\nTu saldo actual es $${saldoUsuario}\n1 - Recarga tu saldo\n2 - Realiza tus compras\n3 - Consulta tus puntos\n4 - Redime tus puntos`)

    if (interfazInteractiva === "1") {
        recargaSaldo(usuarioIngresado)
    } else if (interfazInteractiva === "2") {
        realizarCompra(usuarioIngresado)
    } else if (interfazInteractiva === "3") {
        alert("Aun estamos trabajando para que puedas conocer tus puntos y redimirlos, no te preocupes sientete seguro con nuestros servicios.") // Validar como usar el saldo gastado y el recargado como sumatoria de puntos para cada usuario
        interfazUsuario(usuarioIngresado)
    } else if (interfazInteractiva === "4") {
        alert("Aun estamos trabajando para que puedas conocer tus puntos y redimirlos, no te preocupes sientete seguro con nuestros servicios.")
        interfazUsuario(usuarioIngresado)
    } else{
        alert("Opcion no encontrada")
        interfazUsuario(usuarioIngresado)
        return
    }

    
}

function realizarCompra(usuarioIngresado) {
    let interfazDeCompras = prompt(`Recuerda que tu saldo actual es $${saldoUsuario}. ¿Qué producto deseas comprar?\n` +
        productos.map(p => `${p.id} - ${p.producto} ($${p.precio})`).join('\n')+ '\n0 - Salir')

    let idProductoSeleccionado = Number(interfazDeCompras)
    let productoSeleccionado = productos.find(p => p.id === idProductoSeleccionado)
    if (interfazDeCompras === "0"){
        interfazUsuario(usuarioIngresado)
        return
    }
    if (productoSeleccionado) {
        if (saldoUsuario >= productoSeleccionado.precio) {
            saldoUsuario -= productoSeleccionado.precio
            alert(`Compra exitosa! Has adquirido ${productoSeleccionado.producto}. Tu saldo restante es $${saldoUsuario}.`)
            realizarCompra(usuarioIngresado)
        } else {
            let recargaSaldo = prompt("Saldo insuficiente para realizar esta compra, ¿Deseas recargar más saldo?: S/N").toUpperCase()
            if (recargaSaldo === "S") {
                recargaSaldo(usuarioIngresado)
            } else {
                alert("Redireccionando a la página principal...")
                interfazUsuario(usuarioIngresado)
            }
        }
    } else {
        alert("Producto no encontrado.")
        realizarCompra(usuarioIngresado)
    }
}


function recargaSaldo(usuarioIngresado) {
    let respuesta = prompt(`Tu saldo actual es $${saldoUsuario}. ¿Deseas recargar dinero a tu cuenta?: S/N`).toUpperCase()

    while (respuesta !== "N" && respuesta !== "S") {
        alert("Por favor, ingresa S para sí o N para no.")
        respuesta = prompt("¿Deseas recargar dinero a tu cuenta?: S/N").toUpperCase()
    }

    if (respuesta === "S") {
        do {
            let cargaSaldo = Number(prompt("¿Cuánto saldo deseas recargar? "))
            while (isNaN(cargaSaldo) || cargaSaldo <= 0) {
                alert("Ingresa un valor válido")
                cargaSaldo = Number(prompt("¿Cuánto saldo deseas recargar? "))
            }
            saldoUsuario += cargaSaldo
            respuesta = prompt("¿Deseas recargar más saldo?: S/N").toUpperCase()
            while (respuesta !== "N" && respuesta !== "S") {
                alert("Por favor, ingresa S para sí o N para no.")
                respuesta = prompt("¿Deseas recargar más saldo?: S/N").toUpperCase()
            }
        } while (respuesta === "S")
    }

    interfazUsuario(usuarioIngresado)
}



function main() {


    alert("¡Bienvenido a nuestra billetera virtual!")

    let validarRegistro = prompt("¿Ya te encuentras registrado?: S/N").toUpperCase()
    while (validarRegistro !== "N" && validarRegistro !== "S") {
        alert("Por favor, ingresa S para sí o N para no.")
        validarRegistro = prompt("¿Ya te encuentras registrado?: S/N").toUpperCase()
    }

    if (validarRegistro === "N") {
        validacionDeRegistroN()
    } else if (validarRegistro === "S") {
        let usuarioIngresado = { nombre: " ", contraseña: " " }
        validacionDeRegistroS(usuarioIngresado)
    }
}

main()

