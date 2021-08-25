var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click",function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoForm(form);
    var erro = document.querySelector("#erro-msg");

    if(ValidaPaciente(paciente)){
        
        //adicionando paciente na tabela
        AdicionaPacienteNaTabela(paciente);

        mensagemAdd(erro);
    }else{
        mensagemErro(erro);
        return;
    }

    form.reset();
})   

function AdicionaPacienteNaTabela(paciente){
    //adicionando paciente na tabela
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPacienteDoForm(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function mensagemAdd(erro){
    erro.textContent = "Paciente adicionado com sucesso!";
    erro.classList.add("mensagem-add")
}

function mensagemErro(erro){
    erro.classList.remove("mensagem-add");
    erro.classList.add("mensagem-erro")
    erro.textContent = "Não foi possivel adicionar o paciente, verifique as informações e tente novamente!";
}





