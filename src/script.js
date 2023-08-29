let menu = document.querySelector("#MenuIcon")
let result = {};
//funcionalidad del sidebar menu
let side = document.querySelector("#sidebar")
let hr = document.querySelector("#hrI")
let cont = document.querySelector("#container");
menu.addEventListener("click",()=>{
    side.classList.toggle("md:w-[5%]");
    side.classList.toggle("lg:mb-6");
    side.classList.toggle("af");
    hr.classList.toggle("w-2/6");
    hr.classList.toggle("mb-6");
    cont.classList.toggle("lg:p-[20px_2%_20px_7%]");
});

//Funcionalidad para traerme la info del canal
(async()=>{
    let peti = await fetch("../data/dataChannel.json");
    result = await peti.json();
})();

//Funcionalidad para cargar videos en la vista home
(async()=>{ 
    let peticion = await fetch("../data/dataVideos.json");
    let res = await peticion.json();
    //contenedor de videos 
    let conta = document.querySelector("#containerVideo");
    conta.insertAdjacentHTML("beforeend",/*html*/`
    ${res.contents.map((value)=>/*html*/`
        <div id="cardV" idV="${value.video.videoId}">
            <a href="./playVideo.html"><img class="w-full rounded-xl" src=${value.video.thumbnails[2].url}></a>
            <div class="flex items-start mt-2">
                <img class="w-9 mr-3 rounded-3xl" src="${result.avatar[0].url}">
                <div class="text-[#5a5a5a] text-xs block mb-1">
                    <a class="text-black" href="">${value.video.title}</a>
                    <p>${result.title}</p>
                    <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                </div>

            </div> 
        </div>
    `).join(" ")
    }`)
    
})();