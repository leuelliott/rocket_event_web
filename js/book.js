function eventBookingData() {
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", "https://projects.deelesisuanu.com/elliot-events/bookEventData");
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
                    output += `<tr>
                                        <td>${i++}</td>
                                        <td>${element.fname}</td>
                                        <td>${element.email}</td>
                                        <td>${element.bookingCode}</td>
                                        <td>${element.eventName}</td>
                                        <td>${element.created}</td>
                                    </tr>`;
                }
            }
            document.getElementById("tableData2").innerHTML = output;
            $('#example').DataTable();
            $("#eventSpinner").hide();
        }
    };
    requestObject.send();
}

$(document).ready(function () {

    eventBookingData();

});