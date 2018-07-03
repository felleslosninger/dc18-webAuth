function addItem(){
    var li = document.createElement("LI");
    var input = document.getElementById("add");
    li.innerHTML = input.value;
    input.value = "";

    document.getElementById("devices").appendChild(li);
}