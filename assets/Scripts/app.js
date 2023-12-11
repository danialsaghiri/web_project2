//todolist
const ulelment = document.querySelector("ul");
const input_list = document.querySelector(".input-list");
const form_list = document.querySelector(".form-list");
const iconadd = document.querySelector(".bx-plus");
const showtimer = document.getElementById("timer");
const shamsitarikh=document.getElementById("shamsi_tarikh");
const islamictarikh=document.getElementById("islamic");
const miladitarikh=document.getElementById("miladi");
const showdama=document.getElementById("dama");
const showfunword=document.getElementById("funword");
const showmaxmin=document.getElementById("max_min_weather");







//click icon add todo
iconadd.addEventListener("click", (e) => {
    e.preventDefault();
    todolist();
})
//submit todo
form_list.addEventListener("submit", (e) => {
    e.preventDefault();
    todolist();
})
const todolist = () => {
    inputvalue = input_list.value.trim();
    if (inputvalue) {
        if (inputvalue.length > 16) {
            inputvalue = inputvalue.slice(0, 16) + "...";
        }
        const lielement = document.createElement("li");
        lielement.classList.add("SingelTodoList", "display-flex");
        lielement.innerHTML = `
        <div class="display-flex">
            <input type="checkbox" class="input-check">
            <p>${inputvalue}</p>
        </div>
        <div>
            <i class='bx bx-edit-alt'></i>
            <i class='bx bx-trash'></i>
        </div>`
        ulelment.prepend(lielement);
        data_save();
        input_list.value = "";
    }
}
//delete task
ulelment.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-trash")) {
        e.target.parentElement.parentElement.remove();
        data_save();
    }
})
function data_save() {
    localStorage.setItem("data", ulelment.innerHTML);
}





const timer = async () => {
    const respons = await fetch("https://api.dastyar.io/express/clock/current");
    const data = await respons.json();
    let hour = new Date(data.current).getHours();
    let minut = new Date(data.current).getMinutes();
    showtimer.innerText = `${hour}:${minut > 9 ? minut:"0"+minut}`;
}
timer();
setInterval(timer,60000);
const tarikh=async ()=>{
    const respons= await fetch("https://kaaryar0506reactblog.liara.run/current/time");
    const data= await respons.json();
    let shamsiday=data.shamsi.dayInMonth;
    let shamsiMonth=data.shamsi.month;
    let islamicday=data.islamicHijri.dayInMonth;
    let islamicMonth=data.islamicHijri.month;
    let islamicyear=data.islamicHijri.year;
    let miladiday=data.miladi.dayInMonth;
    let miladiMonth=data.miladi.month;
    let miladiyear=data.miladi.year;
    shamsitarikh.innerText=`${shamsiday} ${shamsiMonth}`;
    islamictarikh.innerText=`${islamicyear}/${islamicMonth}/${islamicday}`;
    miladitarikh.innerText=`${miladiyear}/${miladiday}/${miladiMonth.slice(0,3)}`;
}
tarikh();
const weather=async ()=>{
    const respons=await fetch("https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light");
    const data = await respons.json();
    const dama=data[0].current;
    const icondama=data[0].weather.icon;
    const funwordweather=data[0].customDescription.text;
    const emojifunword=data[0].customDescription.emoji;
    const maxdama=data[0].max;
    const mindama=data[0].min;
    showdama.innerText=`${dama}°`;
    showfunword.innerText=`${funwordweather} ${emojifunword}`;
    showmaxmin.innerText=`${maxdama} حداکثر . ${mindama} حداقل`
    console.log(data);
}
weather();



ulelment.innerHTML = localStorage.getItem("data");