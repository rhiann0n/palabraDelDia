window.onload=function (){
    let palabra=['azul','amarillo','rojo','rosa','verde','turquesa','gris','morado', 'malva','blanco','negro','marron','naranja','violeta','lila','beige'];
    let palabraSeleccionada = palabra[seleccionarPalabra()].toUpperCase();
    console.log(palabraSeleccionada);
    crearBotones();
    let palabraAdivinar = palabraSeleccionada.split(""); //se crea un arraya de letras de la palabra a adivinar
    console.log(palabraSeleccionada.split("").length); //se crea un array de letras de la palabra a adivinar
    console.log(palabraAdivinar.length); //conocemos cuántas letras tiene la palabra
    crearCuadros(palabraAdivinar.length);
    comprobarLetraUser(palabraSeleccionada);
}

//funciones o métodos
function seleccionarPalabra(){
    let indiceSeleccionado = parseInt(Math.random()*14);
    return indiceSeleccionado;
}
function crearBotones(){
    let divLetras = document.getElementById("divLetras");
    //crear un array con todas las letras del alfabeto
    let letras = 'qwertyuiopasdfghjklñzxcvbnm'.split('');
    letras.forEach(function (letra, indice){
        if (indice==10 || indice == 20){
            let salto = document.createElement("br");
            divLetras.appendChild(salto);
        }
        var boton = document.createElement("button");
        boton.textContent = letra.toUpperCase(); // convertir la letra a mayúsucula
        boton.value = letra.toUpperCase(); //agregar el valor de la letra
        boton.classList.add("boton"); //agregar la clase "boton"
        boton.classList.add("boton-letra"); //agregar la clase "boton-letra"
        divLetras.appendChild(boton);
    });
}
function crearCuadros(longitud){
    let letrasAdivinar = document.querySelector(".letras");
    for (let i = 0; i < longitud; i++) {
        letrasAdivinar.classList.add("letras");
        let unaLetra = document.createElement("span");
        //agregar atributo id con el valor de i
        unaLetra.setAttribute("id",String(i));
        /**/
        unaLetra.classList.add("cuadros");
        letrasAdivinar.appendChild(unaLetra);
    }
}
function comprobarLetraUser(palabra){
    /**/
    let contadorUserC = 0;
    let contadorUser= 6;
    let cuadrosLetras = document.querySelectorAll(".cuadros");
    /**/
    /*console.log(cuadrosLetras);*/
    let letraUser = document.querySelectorAll(".boton-letra");
    let ahorcado = document.querySelector(".ahorcado");
    letraUser.forEach(function (elem){
        elem.addEventListener("click",function () {
            correcta = false;
            console.log(elem.value);
            console.log(palabra);
            for (let i = 0; i < palabra.length; i++) {
                console.log(palabra[i]);
                if (palabra[i] == elem.value) {
                    /*console.log(i);*/
                    cuadrosLetras[i].innerHTML = elem.value;
                    /*bloquear y colorear el teclado cn las letras seleccionadas por el user*/
                    correcta = true;
                    elem.disabled = true;
                    /*comprobar que el user adivinó la palabra*/
                    ++contadorUserC;
                    if (contadorUserC == palabra.length) {
                        letraUser.forEach(function (e) {
                            console.log(contadorUser);
                            e.disabled = true;
                        })
                            ganador();
                            mostrarBotonesPartida();
                }
            }
        }
            if(correcta){
                elem.style.backgroundColor="darkgreen";
                elem.style.color="ghostwhite";
            }else{
                elem.style.backgroundColor="darkred";
                elem.style.color="ghostwhite";
                --contadorUser;

                ahorcado.src="views/img/img"+contadorUser+".png";
                if (contadorUser == 0){
                    letraUser.forEach(function (e){
                        e.disabled=true;
                        mostrarBotonesPartida();

                    });
                }
            }
            document.querySelector(".contador").innerHTML=`Te quedan ${contadorUser} intentos`;

        })

    })

}
function mostrarBotonesPartida(){
    let partida = document.querySelector(".nuevaP");
    let salir = document.querySelector(".salir");
    partida.style.visibility="visible";
    salir.style.visibility="visible";
    partida.addEventListener("click", function (){
        window.location.reload();
    })
    salir.addEventListener("click", function (){
        window.close();
    })
}