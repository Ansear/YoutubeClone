let menu = document.querySelector("#MenuIcon")
let side = document.querySelector("#sidebar")
let hr = document.querySelector("#hrI")
let cont = document.querySelector("#container");
menu.addEventListener("click",()=>{
    side.classList.toggle("lg:w-[5%]");
    side.classList.toggle("lg:mb-6");
    side.classList.toggle("af");
    hr.classList.toggle("w-2/6");
    hr.classList.toggle("mb-6");
    cont.classList.toggle("lg:p-[20px_2%_20px_7%]");
})