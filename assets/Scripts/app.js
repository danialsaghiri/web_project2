//todolist
const ulelment = document.querySelector("ul");
const input_list = document.querySelector(".input-list");
const form_list = document.querySelector(".form-list");
const iconadd = document.querySelector(".bx-plus");
const showclock = document.getElementById("clock");
const shamsitarikh=document.getElementById("shamsi_tarikh");
const islamictarikh=document.getElementById("islamic");
const miladitarikh=document.getElementById("miladi");
const showdama=document.getElementById("text__dama");
const showfunword=document.getElementById("funword");
const showmaxmin=document.getElementById("max_min_weather");
const damaelement=document.querySelector("#dama");





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
function data_get(){
    ulelment.innerHTML = localStorage.getItem("data");
}



function farsi_number(ennum){
    const fanum="۰۱۲۳۴۵۶۷۸۹";
    let arr=[];
    let result="";
    for(let i=0;i<ennum.length;i++){
        arr[i]=ennum.slice(i,i+1);
        arr[i]=fanum[arr[i]];
        result=result+ arr[i];
    }
    console.log(result);
    return result;
}

const clock = async () => {
    const respons = await fetch("https://api.dastyar.io/express/clock/current");
    const data = await respons.json();
    let hour = farsi_number(String(new Date(data.current).getHours()));
    let copyminut=new Date(data.current).getMinutes();
    let minut = farsi_number(String(new Date(data.current).getMinutes()));
    showclock.innerText = `${hour}:${copyminut > 9 ? minut:"۰"+minut}`;
}
clock();
setInterval(clock,60000);
const tarikh=async ()=>{
    const respons= await fetch("https://kaaryar0506reactblog.liara.run/current/time");
    const data= await respons.json();
    let shamsiday=data.shamsi.dayInMonth;
    let shamsiMonth=data.shamsi.month;
    let islamicday=farsi_number(data.islamicHijri.dayInMonth);
    let islamicMonth=data.islamicHijri.month;
    let islamicyear=farsi_number(data.islamicHijri.year.slice(0,4));
    let miladiday=farsi_number(data.miladi.dayInMonth);
    let miladiMonth=data.miladi.month;
    let miladiyear=farsi_number(data.miladi.year);
    shamsitarikh.innerText=`${shamsiday} ${shamsiMonth}`;
    islamictarikh.innerText=`${islamicyear}/${islamicMonth}/${islamicday}`;
    miladitarikh.innerText=`${miladiyear}/${miladiMonth.slice(0,3)}/${miladiday}`;
}
tarikh();
const weather=async ()=>{
    const respons=await fetch("https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light");
    const data = await respons.json();
    const dama=farsi_number(String(parseInt(data[0].current)));
    const funwordweather=data[0].customDescription.text;
    const emojifunword=data[0].customDescription.emoji;
    const maxdama=farsi_number(String(parseInt(data[0].max)));
    const mindama=farsi_number(String(parseInt(data[0].min)));
    showdama.innerText=`${dama}°`;
    showfunword.innerText=`${funwordweather} ${emojifunword}`;
    showmaxmin.innerText=`${maxdama}° حداکثر . °${mindama} حداقل`;
    if(new Date().getHours() >= 5 && new Date().getHours()<=18){
        damaelement.innerHTML+=`<img src="/assets/Images/sun.png" class="weather__img">`
    }
    else{
        damaelement.innerHTML+=`<img src="/assets/Images/night.png" class="weather__img">`;
    }
    console.log(data);
}
weather();

data_get();
