const bienvenida = alert("¡Bienvenido a nuestra billetera virtual!")

let validarRegistro = prompt("¿Ya te encuentras registrado?: S/N").toUpperCase()

while (validarRegistro !== "N" && validarRegistro !== "S") {
    alert("Por favor, ingresa S para sí o N para no.")
    validarRegistro = prompt("¿Ya te encuentras registrado?: S/N").toUpperCase()
}

let idCreacionUsuario = ''
let creacionContraseñaUsuario = ''
let saldoUsuario = 0

if (validarRegistro === "N") {
    idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
    creacionContraseñaUsuario = prompt("Ingresa una contraseña:")

    while (idCreacionUsuario.length < 4) {
        alert("El nombre debe tener más de 4 caracteres. Por favor, ingresa un nombre válido.")
        idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
    }

    while (creacionContraseñaUsuario.length < 8) {
        alert("La contraseña debe tener más de 8 caracteres. Por favor, ingresa una contraseña válida.")
        creacionContraseñaUsuario = prompt("Ingresa una contraseña:")
    }

    alert("Registro exitoso. Ahora puedes acceder a la interfaz de usuario.")
    interfazUsuario()
}

if (validarRegistro === "S") {
    let idUsuario = prompt("Ingresa tu nombre de ingreso:")
    let contraseñaUsuario = prompt("Ingresa tu contraseña para ingresar:")

    if (idUsuario === idCreacionUsuario && contraseñaUsuario === creacionContraseñaUsuario) {
        alert("Ahora puedes acceder a la interfaz de usuario.")
        interfazUsuario()
    } else {
        let continuarRegistro = prompt("Aún no te encuentras registrado ¿Deseas continuar con el registro?: S/N").toUpperCase()

        while (continuarRegistro !== "N" && continuarRegistro !== "S") {
            alert("Por favor, ingresa S para sí o N para no.")
            validarRegistro = prompt("¿Deseas continuar con el registro?: S/N").toUpperCase()
        }
        if (continuarRegistro === "S") {
            idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
            creacionContraseñaUsuario = prompt("Ingresa una contraseña:")

            while (idCreacionUsuario.length < 4) {
                alert("El nombre debe tener más de 4 caracteres. Por favor, ingresa un nombre válido.")
                idCreacionUsuario = prompt("¿Cómo quieres que te llamemos? Ingresa un nombre para tu registro:")
            }

            while (creacionContraseñaUsuario.length < 8) {
                alert("La contraseña debe tener más de 8 caracteres. Por favor, ingresa una contraseña válida.")
                creacionContraseñaUsuario = prompt("Ingresa una contraseña:")
            }

            alert("Registro exitoso. Ahora puedes acceder a la interfaz de usuario.")
            interfazUsuario()
        }
    }
}

function interfazUsuario() {
    let interfazInteractiva = prompt(`Bienvenido/a, ${idCreacionUsuario}\nTu saldo actual es ${saldoUsuario}\n1 - Recarga tu saldo\n2 - Realiza tus compras\n3 - Consulta tus puntos\n4 - Redime tus puntos`)

    if (interfazInteractiva === "1") {
        let recargaSaldo = prompt(`Tu saldo es de ${saldoUsuario}. ¿Deseas recargar dinero a tu cuenta?: S/N`).toUpperCase()
        while (recargaSaldo !== "N" && recargaSaldo !== "S") {
            alert("Por favor, ingresa S para sí o N para no.")
            recargaSaldo = prompt("¿Deseas recargar dinero a tu cuenta?: S/N").toUpperCase()
        }

        if (recargaSaldo === "S") {
            do {
                let cargaSaldo = Number(prompt("¿Cuánto saldo deseas recargar? "))
                while (isNaN(cargaSaldo)) {
                    alert("Ingresa un valor válido");
                    cargaSaldo = Number(prompt("¿Cuánto saldo deseas recargar? "))
                }
                saldoUsuario += cargaSaldo
                recargaSaldo = prompt("¿Deseas recargar más saldo?: S/N").toUpperCase()
                while (recargaSaldo !== "N" && recargaSaldo !== "S") {
                    alert("Por favor, ingresa S para sí o N para no.")
                    recargaSaldo = prompt("¿Deseas recargar más saldo?: S/N").toUpperCase()
                }
            } while (recargaSaldo === "S")
        }
        if (recargaSaldo === "N") {
            interfazUsuario()
        }
    }

    if (interfazInteractiva === "2") {
        let interfazDeCompras = prompt(`Recuerda que tu saldo actual es ${saldoUsuario}\n nuestro catalogo actual es: \n1 - Chance: 2500 \n2 - Astro: 6000 \n3 - Billonario 4c: 8900 `)
        while (interfazDeCompras !== "1" && interfazDeCompras !== "2" && interfazDeCompras !== "3") {
            alert("Por favor ingresa una opcion del 1 al 3, no se permiten otros caractere")
            interfazDeCompras = prompt(`Recuerda que tu saldo actual es ${saldoUsuario}\n nuestro catalogo actual es: \n1 - Chance: 2500 \n2 - Astro: 6000 \n3 - Billonario 4c: 8900 `)
        }
        if (interfazDeCompras === "1") {
            let validacionCompra
            do {
                validacionCompra = prompt("¿Estas seguro de que quieres realizar la compra de chance?\n se descontaran 2500 de tu billetera: S/N").toUpperCase()
                if (validacionCompra === "S") {
                    if (saldoUsuario >= 2500) {
                        saldoUsuario -= 2500
                        alert("Compra realizada con éxito. Tu saldo actual es " + saldoUsuario)
                    } else {
                        alert("Saldo insuficiente para realizar la compra.")
                        interfazUsuario()
                    }
                }
                validacionCompra = prompt("¿Deseas volver a comprar un chance?: S/N").toUpperCase()
                if (validacionCompra === "N") {
                    interfazUsuario()
                    return
                }
                
            } while (validacionCompra === "S")
        }

        if (interfazDeCompras === "2") {
            let validacionCompra
            do {
                validacionCompra = prompt("¿Estas seguro de que quieres realizar la compra de Astro?\n se descontaran 6000 de tu billetera: S/N").toUpperCase()
                if (validacionCompra === "S") {
                    if (saldoUsuario >= 6000) {
                        saldoUsuario -= 6000
                        alert("Compra realizada con éxito. Tu saldo actual es " + saldoUsuario)
                    } else {
                        alert("Saldo insuficiente para realizar la compra.")
                        interfazUsuario()
                    }
                }
                validacionCompra = prompt("¿Deseas volver a comprar un Astro?: S/N").toUpperCase()
                if (validacionCompra === "N") {
                    interfazUsuario()
                    return
                }
                
            } while (validacionCompra === "S")
        }

        if (interfazDeCompras === "3") {
            let validacionCompra
            do {
                validacionCompra = prompt("¿Estas seguro de que quieres realizar la compra de Billonario?\n se descontaran 8900 de tu billetera: S/N").toUpperCase()
                if (validacionCompra === "S") {
                    if (saldoUsuario >= 8900) {
                        saldoUsuario -= 8900
                        alert("Compra realizada con éxito. Tu saldo actual es " + saldoUsuario)
                    } else {
                        alert("Saldo insuficiente para realizar la compra.")
                        interfazUsuario()
                    }
                }
                validacionCompra = prompt("¿Deseas volver a comprar un Billonario?: S/N").toUpperCase()
                if (validacionCompra === "N") {
                    interfazUsuario()
                    return
                }
                
            } while (validacionCompra === "S")
        }
    }
    
    if(interfazInteractiva === "3"){
        alert("Aun estamos trabajando para que puedas conocer tus puntos y redimirlos, no te preocupes sientete seguro con nuestros servicios.") // Validar como usar el saldo gastado y el recargado como sumatoria de puntos para cada usuario
        interfazUsuario()
    }
    if (interfazInteractiva === "4") {
        alert("Aun estamos trabajando para que puedas conocer tus puntos y redimirlos, no te preocupes sientete seguro con nuestros servicios.") 
        interfazUsuario()
    }

}




