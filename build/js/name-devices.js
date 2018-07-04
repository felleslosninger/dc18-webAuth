function addItem() {
    const li = document.createElement("LI");
    const input = document.getElementById("add");
    const name = input.value;

    var dt = new Date();
    var utcDate = dt.toUTCString();

    li.innerHTML = "<a class='ln-List_Element'> " +
        "<div class='ln-List_Element_Service'> " +
        "<span class='ln-List_Element_Service_Name'>" + name + "</span> " +
        "<span class='ln-List_Element_Service_Info'>Registert: " + utcDate + "</span> " +
        "</div> " +
        "<span class='fa fa-angle-right fa-lg'></span> " +
        "</a>";
    document.getElementById("device").appendChild(li);
    document.getElementById("add-devices-controls").style.visibility = "hidden";
}

function showControls() {
    document.getElementById("device").innerHTML = "";
    document.getElementById("add-devices-controls").style.visibility = "visible";
}