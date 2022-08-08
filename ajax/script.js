document.addEventListener("DOMContentLoaded", 
function (event) {

    document.querySelector("button").addEventListener("click", 
    function() {
        $utilajax.sendGetRequest("data/text.json", function (request) {
            var name = request.nome;
            var idade = request.idade;

            document.querySelector("#content").innerHTML = "<h2>Hello "+ name + idade + "!</h2>";
        });
    });
});