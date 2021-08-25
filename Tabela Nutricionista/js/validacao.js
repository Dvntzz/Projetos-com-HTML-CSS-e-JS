function validaNome(nome){
    if(nome.length <= 0){
        return false;
    }else{
        return true;
    }
}

function validaGordura(gordura){
    if(gordura <= 0 && gordura > 300){
        return false;
    }else{
        return true;
    }
}

function ValidaPaciente(paciente){
     if(validaPeso(paciente.peso) && validaAltura(paciente.altura) && 
        validaNome(paciente.nome) && validaGordura(paciente.gordura)){
            return true;
        }else{
            return false;
        }
}