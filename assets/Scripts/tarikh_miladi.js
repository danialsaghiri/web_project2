const miladitarikh=document.getElementById("miladi");


const tarikh_miladi=async ()=>{
    const respons= await fetch("https://kaaryar0506reactblog.liara.run/current/time");
    const data= await respons.json();
    let miladiday=farsi_number(data.miladi.dayInMonth);
    let miladiMonth=data.miladi.month;
    let miladiyear=farsi_number(data.miladi.year);
    miladitarikh.innerText=`${miladiyear}/${miladiMonth.slice(0,3)}/${miladiday}`;
}
tarikh_miladi();
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