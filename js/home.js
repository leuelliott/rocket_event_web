function eventData() {
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", "https://projects.deelesisuanu.com/elliot-events/eventData");
    requestObject.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText == "[]" || this.responseText == "[][]"){
                return;
            }
            const responseData = JSON.parse(this.responseText);
            let output = "";
            var i = 1;
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    const element = responseData[key];
                    output += `<div class="col-md-4 mb-5">
                                <div class="card h-100">
                                <img class="card-img-top" src="${element.icon}" alt="" height="350">
                                <div class="card-body">
                                    <h4 class="card-title">${element.name}</h4>
                                    <p class="card-text"></p>
                                </div>
                                <div class="card-footer">
                                    <a href="event.html?eid=${element.id}" class="btn btn-primary">Event Details</a>
                                </div>
                                </div>
                            </div>`;
                }
            }
            document.getElementById("rowData").innerHTML = output;
            $("#rowSpinner").hide();
        }
    };
    requestObject.send();
}

$(document).ready(function () {
    eventData();
});