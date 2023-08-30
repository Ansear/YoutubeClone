const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '336d3c2699msh531eb879ce2e8cep17f231jsn02286e20b027',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

//Funcionalidad para traerme la info del canal
async function funcionDataC(){ 
    options.method = 'GET';
    let peti = await fetch("https://youtube138.p.rapidapi.com/channel/details/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options);
    let dataChannel = await peti.json();
    return dataChannel
}
//Funcionalidad para cargar videos en la vista home
(async()=>{ 
    options.method = 'GET';
    let peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options);
    let res = await peticion.json();
    let dataChannel = await funcionDataC()
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
(async(p1)=>{
    options.method = 'GET';
    let peticion = await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${p1}&hl=en&gl=US`,options)
    let res = await peticion.json()
    console.log(res)
    let dataChannel = await funcionDataC()
    let deta = document.querySelector("#details")
    let chanel = document.querySelector("#channel")
    let des = document.querySelector("#descrip")
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
        <a href="./channel.html">
        <img class=" rounded-3xl mr-4" src=${dataChannel.avatar[0].url} >
        </a>
        <div class="flex-[1]">
        <a href="./channel.html"><p class="text-black font-semibold text-lg">${dataChannel.title}</p></a>
            <span class="text-xs text-[#5a5a5a]">${dataChannel.stats.subscribers} Subscribers</span>
        </div>
        <button class="bg-red-600 text-white py-2 px-8 border-none outline-[0] rounded-3xl cursor-pointer " type="submit">Subscribe</button>
    </div>
    `)

    des.insertAdjacentHTML("afterend",/*html*/`
        <p class="text-sm mb-1 text-[#5a5a5a]">${dataChannel.description}</p>
    `)
    
})(elementStorage);
