let mangasCollection = [];

const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", addMangaRow);

const mangaTable = document.getElementById("manga-table");
const rowTemplate = document.getElementById("row-template");

function addMangaRow() {    
    const newRow = rowTemplate.cloneNode(true);
    newRow.classList.remove("hidden");
    newRow.removeAttribute("id");

    newRow.querySelector(".change").addEventListener("click", 
        function(){
            changeRow(this, newRow);
        });

    newRow.querySelector(".delete").addEventListener("click", 
        function(){
            deleteRow(newRow);
        });

    mangaTable.appendChild(newRow);
}

function deleteRow(caller) {
    confirm("Are you sure you want to delete this?");
    mangaTable.removeChild(caller);
}

function changeRow(button, caller) {
    console.log(button.dataset.state);
    if(button.dataset.state === "save") {
        if(saveRow(caller) === -1) return;
        button.dataset.state = "edit";
        button.innerText = "Edit";
    }
    else {
        button.dataset.state = "save";
        button.innerText = "Save";
        editRow(caller);
    }
}

function saveRow(caller) {
    console.log("saving now");
    let inputs = caller.querySelectorAll("input");
    
    // Firstly check all
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("All fields must be filled before saving!");
            return -1;
        }
    }
    
    // Then disable
    inputs.forEach(input => {
        input.disabled = true;
    });
}

function editRow(caller) {
    console.log("editing now");
    let inputs = caller.querySelectorAll("input");
    
    inputs.forEach(input => {
        input.disabled = false;
    });
}