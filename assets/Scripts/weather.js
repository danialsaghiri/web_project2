

const showdama=document.querySelector(".dama__text");
const showfunword=document.querySelector(".weather__funword");
const showmaxmin=document.querySelector(".weather__max-min");
const damaelement=document.querySelector(".dama");


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
    creatimg();
}
weather();
const creatimg=()=>{
    if(new Date().getHours() >= 5 && new Date().getHours()<=18){
        damaelement.innerHTML+=`<img src="./assets/Images/sun.png" class="weather__img">`
    }
    else{
        damaelement.innerHTML+=`<img src="./assets/Images/night.png" class="weather__img">`;
    }
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
    return result;
}