/* codigo del proyecto con api */

const cards = document.getElementById('card-dinamicas');
const templateCard = document.getElementById('templateCard').content;
const fragment = document.createDocumentFragment();// el fragment guardara los elementos de la api
const loading = document.querySelector('#loading');

document.addEventListener("DOMContentLoaded", () => {//siempre cargar el don si vamos a trabajr con una api
    fetchData();

});



//seccion de loadin de la pagina
const loadindData = estado => {// con esto vamos a remover o agregar la clase d-none
    
    if(estado){//si estado es true
        loading.classList.remove('d-none');//remover la clase d-none
    }else{
        loading.classList.add('d-none');//remover la clase d-none
        
    }
}

//hacer la solicitud a la api
const fetchData = async () => {
    try {
        loadindData(true);//carga el loading

        const res = await fetch("https://rickandmortyapi.com/api/character")//obtener la api
        const data = await res.json();//transformarla en json
        pintarCard(data);//mostramos la data
    } catch (error) {
        console.log(error);
        
    }finally{
        loadindData(false);//desactiva el loading
    }
};


const pintarCard = data => {
    //console.log(data);
    data.results.forEach((item) => {//results es la varible que contiene los elemntos en la api
        //console.log(item);
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name //solo hay un h5 dentro del templateCard
        clone.querySelector("p").textContent = item.species;
        clone.querySelector(".card-img-top").setAttribute("src", item.image);

        fragment.appendChild(clone);
        
    });
    cards.appendChild(fragment)
}
