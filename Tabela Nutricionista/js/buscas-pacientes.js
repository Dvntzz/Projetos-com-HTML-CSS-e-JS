var botaoAdd = document.querySelector("#buscar-paciente");
var API = "http://api-pacientes.herokuapp.com/pacientes";

botaoAdd.addEventListener("click", function(){
    var erroAjax = document.querySelector("#erro-ajax");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API);


    xhr.addEventListener("load", function(){
        if(xhr.status == 200){
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
    
            pacientes.forEach(function(paciente){
                AdicionaPacienteNaTabela(paciente);
            })
        
        }else{
            erroAjax.classList.remove("invisivel");
        }
    })

    xhr.send();
})