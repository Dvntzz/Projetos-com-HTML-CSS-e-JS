var pacientes = document.querySelectorAll(".paciente");

for(var i = 0; i < pacientes.length;i++){
    var paciente = pacientes[i];

    var PacientePeso = paciente.querySelector(".info-peso");
    var peso = PacientePeso.textContent;

    var PacienteAltura = paciente.querySelector(".info-altura");
    var altura = PacienteAltura.textContent;

    var PacienteImc = paciente.querySelector(".info-imc");
        if(validaAltura(altura) && validaPeso(peso)){
            PacienteImc.textContent = calculaImc(peso,altura);
        }
}

function calculaImc(peso,altura){
   var imc = 0;
   imc =  peso / (altura * altura);
   return Math.round(imc);
}

function validaPeso(peso){
    if(peso <= 0 || peso >= 500){
        return false;
    }else{
        return true;
    }   
}

function validaAltura(altura){
    if(altura <= 0 || altura >= 3.15){
        return false;
    }else{
        return true;
    }
}






