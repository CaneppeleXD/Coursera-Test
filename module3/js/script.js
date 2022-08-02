var x = 'HelloWorld';

var verificarInvalidos = function() {
    var retorno = false;
    var invalidos = "!@#$%^&*()_+-=/*-+;:?/.,><{}[]`~|'" + '"';
    for(var i = 0;i<x.length && retorno == false;i++){
        for(var y = 0;y<invalidos.length && retorno == false;y++){
            if(x.charAt(i) == invalidos.charAt(y)){retorno=true}
        }
        
    }
    return(retorno);
};

console.log(verificarInvalidos());
