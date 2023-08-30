const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '66af84d208mshea2b62d16c101d3p1f40dejsnea82d34c97d6',
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

//Funcionalidad para pintar la info del canal
(async ()=>{ 
        let dataChannel = await funcionDataC();
        let container = document.querySelector("#containerC");
        container.insertAdjacentHTML("afterbegin",/*hmtl */`
        <div class="w-full ">
            <img class="w-full border-lg" src=${dataChannel.banner.desktop[4].url} alt="banner">
            <div class="mt-3 flex justify-between
            items-center">
                <div class="w-5/12 flex gap-x-2">
                    <img class="rounded-full w-28" src=${dataChannel.avatar[0].url} alt="">
                    <div class="flex flex-col justify-center w-10/12">
                        <h3 class="font-bold">CreativeCode</h3>
                        <div class="flex items-center justify-between">
                            <p class="font-semibold">${dataChannel.username}</p>
                            <p href="">${dataChannel.stats.subscribersText}</p>
                            <p href="">${dataChannel.stats.videosText}</p>
                        </div>
                        <p>More information about this channel ></p>
                    </div>
                </div>
                <button class="bg-red-600 text-white py-2 px-8 border-none outline-[0] rounded-3xl cursor-pointer">Subscribe</button>
            </div>
        </div>`)
    }
)();


//Funcionalidad para cargar videos en la vista home
(async()=>{ 
    options.method = 'GET';
    let peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options);
    let res = await peticion.json();
    let dataChannel = await funcionDataC()
    //contenedor de videos 
    let conta = document.querySelector("#containerVideo");
    conta.insertAdjacentHTML("beforeend",/*html*/`
    ${res.contents.map((value)=>/*html*/`
        <div id="cardV" idV="${value.video.videoId}">
            <a href="./playVideo.html"><img class="w-full rounded-xl" src=${value.video.thumbnails[2].url}></a>
            <div class="flex items-start mt-2">
                <img class="w-9 mr-3 rounded-3xl" src="${dataChannel.avatar[0].url}">
                <div class="text-[#5a5a5a] text-xs block mb-1">
                    <a class="text-black" href="">${value.video.title}</a>
                    <p>${dataChannel.title}</p>
                    <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                </div>

            </div> 
        </div>
    `).join(" ")
    }`)
    let cards = document.querySelectorAll("#cardV");
    cards.forEach(e=>{
        e.addEventListener("click",()=>{
            idV = e.getAttribute("idV");
            localStorage.setItem("ID VIDEO", idV);
        })
    })
})();


