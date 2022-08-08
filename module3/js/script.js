document.addEventListener("DOMContentLoaded",
    function (event) {
        var verificarInvalidos = function () {
            var x = document.getElementById("word").value;
            var retorno = false;
            var invalidos = "!@#$%^&*()_+-=/*-+;:?/.,><{}[]`~|'" + '"';
            for (var i = 0; i < x.length && retorno == false; i++) {
                for (var y = 0; y < invalidos.length && retorno == false; y++) {
                    if (x.charAt(i) == invalidos.charAt(y)) { retorno = true }
                }

            }
            return (retorno);
        };

        var validar = function (event) {
            if (verificarInvalidos()) {
                document.querySelector("h1").textContent = "Palavra Invalida";
            }
            else {
                document.querySelector("h1").textContent = "Palavra Valida";
            }

        };

        var coordenada = function (event) {
            // console.log(event);
            if(event.shiftKey === true){
                console.log("X: " + event.clientX);
                console.log("Y: " + event.clientY);
            }
        }
        document.querySelector("#send").addEventListener("click", validar);
        document.querySelector("body").addEventListener("mousemove", coordenada);
    }

);

