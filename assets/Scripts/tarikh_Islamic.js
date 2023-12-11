const islamictarikh=document.querySelector(".time__islamic");



const tarikh_islamic=async()=>{
    const respons= await fetch("https://kaaryar0506reactblog.liara.run/current/time");
    const data= await respons.json();
    let islamicday=farsi_number(data.islamicHijri.dayInMonth);
    let islamicMonth=data.islamicHijri.month;
    let islamicyear=farsi_number(data.islamicHijri.year.slice(0,4));
    islamictarikh.innerText=`${islamicyear}/${islamicMonth}/${islamicday}`;
}
tarikh_islamic();
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