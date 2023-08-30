
let menu = document.querySelector("#MenuIcon")
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
async function funcionDataC(){ 
    let peti = await fetch("../data/dataChannel.json");
    let dataChannel = await peti.json();
    return await dataChannel
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '336d3c2699msh531eb879ce2e8cep17f231jsn02286e20b027',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};
//Funcionalidad para cargar videos en la vista home
(async()=>{ 
    options.method = 'GET';
    let peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options);
    let res = await peticion.json();
    console.log(res)
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
})(options);
console.log(elementStorage)
//Funcionalidades para las sugerencias del buscador
(async()=>{
    options.method = 'GET';
    // let peticion = await fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options);
    let res = await peticion.json();
    let dataChannel = await funcionDataC()
    let search = document.querySelector("#chatSearch")
    search.addEventListener("change", (e)=>{
        if(e.target.value){
            document.querySelector("#boxSearch").style.borderRadius = "15px";
            document.querySelector("#resultOut").style.display = "none";
        }else{
            document.querySelector("#boxSearch").style.borderRadius = "15px 15px 0px 0px";
            (async()=>{
                let peti = await fetch("../data/dataVideos.json");
                let res = await peti.json();
                let h=0,cont =0;
                let array = res.contents.map((val,id)=>{
                    if(val.playlist) return undefined;
                    else{
                        cont++
                    }
                    if(cont<=10) h = 30 * cont;

                    return /*html*/`<a href="./playVideo.html" id="element" idV="${val.video.videoId}"><li>${val.video.title}</li></a>
            ${console.log(val.video.title)};`

                })
                document.querySelector("#resultOut").style.display = "inline";
                document.querySelector("#divOut").style.height =`${h}px`;
                document.querySelector("#out").innerHTML = null;
                document.querySelector("#out").insertAdjacentElement("beforeend",
                array.join(" "))
                let elementOut = document.querySelector("#element");
                elementOut.forEach(e=>{
                    e.addEventListener("click",()=>{
                        idV = e.getAttribute("idV");
                        localStorage.setItem("ID VIDEO", idV);
                    })
                })
            })();
        }
    })
})();