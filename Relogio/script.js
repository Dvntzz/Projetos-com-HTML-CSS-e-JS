function carregar(){
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('img')
    var saud = window.document.getElementById('saudacoes')
    var data = new Date()
    var hora = data.getHours()
    var minuto = data.getMinutes()
    msg.innerHTML = 'agora são '+hora+':'+minuto
    if(hora >= 5 && hora < 12){
        //BOM DIA
        img.src = 'manha.jpg'
        saud.innerHTML = 'Bom dia!'
        document.body.style.background = '#e7cb7d'
        
    }else if(hora >= 12 && hora < 18){
        //BOA TARDE
        img.src = 'tarde.jfif'
        saud.innerHTML = 'Boa Tarde!'
        document.body.style.background = '#be6c28'
    }else{
        //BOA NOITE
        img.src = 'noite.jfif'
        saud.innerHTML = 'Boa Noite!'
        document.body.style.background = '#103e81'
    }
}





