const ulelment = document.querySelector("ul");
const input_list = document.querySelector(".input-list");
const form_list = document.querySelector(".form-list");
const iconadd = document.querySelector(".bx-plus");





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
data_get();