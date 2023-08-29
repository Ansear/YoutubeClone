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
    let deta = document.querySelector("#details")
    let chanel = document.querySelector("#channel")
    deta.insertAdjacentHTML("beforeend",
        /*html */`
        <h3 class="text-xl font-semibold">${res.title}</h3>
        <div class="flex items-center justify-between flex-wrap mt-2.5 text-sm text-[#5a5a5a]">
            <p>${res.stats.views}views &bull; ${res.publishedDate}</p>
            <div>
                <a class="inline-flex items-center ml-4" href=""><img class="w-5 mr-2" src="../images/like.png" alt="">${res.stats.likes}</a>
                <a class="inline-flex items-center ml-4" href=""><img class="w-5 mr-2" src="../images/dislike.png" alt=""></a>
                <a class="inline-flex items-center ml-4" href=""><img class="w-5 mr-2" src="../images/share.png" alt="">Share</a>
                <a class="inline-flex items-center ml-4" href=""><img class="w-5 mr-2" src="../images/save.png" alt="">Save</a>
            </div>
        </div>`
    )
    chanel.insertAdjacentHTML("beforeend",/*html*/`
    <div class="flex w-full">
        <img class=" rounded-3xl mr-4" src=${dataChannel.avatar[0].url} >
        <div class="flex-[1]">
            <p class="text-black font-semibold text-lg">${dataChannel.title}</p>
            <span class="text-xs text-[#5a5a5a]">${dataChannel.stats.subscribers} Subscribers</span>
        </div>
        <button class="bg-red-600 text-white py-2 px-8 border-none outline-[0] rounded-3xl cursor-pointer " type="submit">Subscribe</button>
    </div>
    `)
    
})();
console.log(dataChannel)

/*html*/`
<p class="text-sm mb-1 text-[#5a5a5a]">Channel that makes learning easy</p>
<p class="text-sm mb-1 text-[#5a5a5a]">Subscribe Easy Tutorials to watch more Tutorials on web Development</p>
`