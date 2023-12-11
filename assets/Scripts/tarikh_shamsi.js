const shamsitarikh=document.querySelector(".time__shamsi");



const tarikh_shamsi=async()=>{
    const respons= await fetch("https://kaaryar0506reactblog.liara.run/current/time");
    const data= await respons.json();
    let shamsiday=data.shamsi.dayInMonth;
    let shamsiMonth=data.shamsi.month;
    shamsitarikh.innerText=`${shamsiday} ${shamsiMonth}`;
}
tarikh_shamsi();