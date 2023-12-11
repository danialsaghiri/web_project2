

const showclock = document.getElementById("clock");
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