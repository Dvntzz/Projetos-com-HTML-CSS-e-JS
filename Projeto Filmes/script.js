//The Movie DB API
//minha chave da API
const API_KEY = 'api_key=356751cd1ffc0fd2b832aafa389a8f35&language=pt-BR';
//base de URL
const BASE_URL = 'https://api.themoviedb.org/3';
//url de acesso aos filmes mais populares
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
//url banner do filme
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
//url pesquisar na api por String
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
//div main onde os cartoes devem ficar
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage =1;
var nextPage =2;
var prevPage= 3;
var lastUrl='';
var totalPages=100;

//generos dos filmes (url = https://api.themoviedb.org/3/genre/movie/list?api_key=356751cd1ffc0fd2b832aafa389a8f35)
const genres = [
    {
      "id": 28,
      "name": "Ação"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 16,
      "name": "Animação"
    },
    {
      "id": 35,
      "name": "Comédia"
    },
    {
      "id": 80,
      "name": "Crimes"
    },
    {
      "id": 99,
      "name": "Documentario"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Familia"
    },
    {
      "id": 14,
      "name": "Fantasia"
    },
    {
      "id": 36,
      "name": "Historia"
    },
    {
      "id": 27,
      "name": "Terror"
    },
    {
      "id": 10402,
      "name": "Musica"
    },
    {
      "id": 9648,
      "name": "Misterio"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Ficção"
    },
    {
      "id": 10770,
      "name": "FilmeTV"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "Guerra"
    },
    {
      "id": 37,
      "name": "Ocidental"
    }
  ]
  
var selectedGenre=[]
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click',() =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id,idx) => {
                    if(id == genre.id){
                      selectedGenre.splice(idx, 1);
                    }
                  })
                }else{
                  selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL+'&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  cleatBtn()
  if(selectedGenre.length !=0){
      selectedGenre.forEach(id =>{
        const highlightedTag = document.getElementById(id);
        highlightedTag.classList.add('highlight')
    })
}
  }


function showMovies(data){
    main.innerHTML='';

    //para cada filme criar esse formato de cartão
    data.forEach(movie => {
        const{title,overview,vote_average,poster_path,release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1500"}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
        </div>
        <div class="movie-info">
        <p id="datalançamento">Lançamento: ${release_date}</p>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h2>Análise geral</h2>
            <p id="datalançamento">Lançamento: ${release_date}</p>
            <p id="analise">${overview}</p>
        </div>
    `

    main.appendChild(movieEl);
    })

    function getColor(vote){
        if(vote>=8){
            return 'green'
        }else if(vote>= 4){
            return "orange"
        }else{
            return 'red'
        }
    }
}

//função recebendo o os parametros(link para a api, na ordem de filmes mais populares)
getMovies(API_URL);

//função buscando os conteudos da api
function getMovies(url){
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
          showMovies(data.results);
            currentPage =data.page;
            nextPage = currentPage + 1;
            prevPage= currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disable');
              next.classList.remove('disable');
            }else if(currentPage >= totalPages){
              prev.classList.remove('disable');
              next.classList.add('disable');
            }else{
              prev.classList.remove('disable');
              next.classList.remove('disable');
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
          main.innerHTML=`<h1 class="resultado">Ops.. sem resultados para sua pesquisa!</h1>`
        }
    })
}

function cleatBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
    clearBtn.classList.add('highlight')
  }else{

    let clear = document.createElement('div');
    clear.classList.add('tag','highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () =>{
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    })
    tagsEl.append(clear);
  }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    }else{
        getMovies(API_URL);
    }

})

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})



next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
      let url = lastUrl + '&page=' + page
      getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}