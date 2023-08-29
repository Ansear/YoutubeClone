(async()=>{
    let peticion = await fetch("../data/dataVideoDetail.json");
    let res = await peticion.json();

})();

//Funcionalidad para traerme la info del canal
let dataChannel = {};
(async()=>{ 
    let peti = await fetch("../data/dataChannel.json");
    dataChannel = await peti.json();
})();

//Funcionalidad para cargar videos en la vista home
(async()=>{ 
    let peticion = await fetch("../data/dataVideos.json");
    let res = await peticion.json();
    //contenedor de videos 
    let container = document.querySelector("#containerVideos");
    container.insertAdjacentHTML("beforeend",/*html*/`
    ${res.contents.map((value)=>/*html*/`
        <div class="flex justify-between mb-2" id="cardV" idV="${value.video.videoId}">
                        <a class="basis-[49%]" href="./playVideo.html">
                            <img class="w-full" src="${value.video.thumbnails[2].url}">
                        </a>
                        <div class="basis-[49%] text-[#5a5a5a] sm:text-xl lg:text-xs block mb-1">
                            <a class="text-black" >${value.video.title}</a>
                            <p>${dataChannel.title}</p>
                            <p>${value.video.stats.views} Views</p>
                        </div>
                    </div>
    `).join(" ")
    }`);
    let cards = document.querySelectorAll("#cardV");
    cards.forEach(e=>{
        e.addEventListener("click",()=>{
            idV = e.getAttribute("idV");
            localStorage.setItem("ID VIDEO", idV);
        })
    })
})();

//Funcionalidad para mostrar el video seleccionado anteriormente
let elementStorage = localStorage.getItem("ID VIDEO");
(async(p1)=>{
let fra = document.querySelector("#contVideo");
fra.insertAdjacentHTML("afterbegin",/*html*/`
    <iframe class="w-full sm:h-56 md:h-96 lg:h-96" width="560"  src="https://www.youtube.com/embed/${p1}?si=3bJqrOw8u9xBMcgJ" title="YouTube video player" frameborder="0" allow="" allowfullscreen></iframe>
`)
})(elementStorage);

//Funcionalidad para mostrar la informacion del video seleccionado anteriormente
(async()=>{
    let peticion = await fetch("../data/dataVideoDetail.json")
    let res = await peticion.json()
    
})();