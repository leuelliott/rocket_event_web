function deleteUser(id, name) {

    let continueOption = window.confirm(`Would you want to delete ${name}?`);
    if (!continueOption) {
        $(".customiseText2").show();
        $(".customiseText2").css("background-color", "#9b2915");
        $(".customiseText2").html("It seems you don't to delete any data. Thank you.");
        setTimeout(function () {
            $(".customiseText2").hide();
        }, 2000);
        return;
    }
    removeData(id, name);
}

function eventData() {
    $("#eventSpinner").show();
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", "https://projects.deelesisuanu.com/elliot-events/eventData");
    requestObject.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText == "[]" || this.responseText == "[][]"){
                return;
            }
            const responseData = JSON.parse(this.responseText);
            // console.log(responseData);
            let output = "";
            var i = 1;
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    const element = responseData[key];
                    output += `<tr>
                                        <td>${i++}</td>
                                        <td>${element.name}</td>
                                        <td>${element.dateTime}</td>
                                        <td>${element.description}</td>
                                        <td>
                                            <span>
                                            <button onclick="deleteUser('${element.id}', '${element.name}')" href="javascript:void(0);" class="btn btn-danger remove-particular-event">Delete Event</button>
                                            </span>
                                        </td>
                                    </tr>`;
                }
            }
            document.getElementById("tableData").innerHTML = output;
            $('#example').DataTable();
            $("#eventSpinner").hide();
        }
    };
    requestObject.send();
}

function removeData(id, name) {
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", `https://projects.deelesisuanu.com/elliot-events/eventDataRemove?eid=${id}`);
    requestObject.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const responseData = this.responseText;
            $(".customiseText2").show();
            $(".customiseText2").html((responseData == "success") ? `'${name}' Event Deleted Successfully!` : responseData);
            $(".customiseText2").css("background-color", (responseData == "success") ? "#224244" :
                "#9b2915");
            eventData();
        }
    };
    requestObject.send();
}

$(document).ready(function () {

    $("#eventDescription").summernote();
    $("#btnSpinner").hide();

    eventData();
    
    function generateFormData(object) {
        let formData = new FormData();
        Object.keys(object).forEach((key) => formData.append(key, object[key]));
        return formData;
    }

    $("#btnCreateEvent").on("click", function () {

        $("#btnCreateEvent").hide();
        $("#btnSpinner").show();

        const eventDescription = $("#eventDescription").summernote("code");
        const eventName = $("#eventName").val();
        /* const feat_icon = $("#feat_icon").val(); */
        const feat_icon = $("#icon")[0].files[0];
        const eventDateTime = $("#eventDateTime").val();

        if (eventName == "" || eventDateTime == "" || feat_icon == "") {
            $(".customiseText").show();
            $(".customiseText").css("background-color", "#9b2915");
            $(".customiseText").html("All Fields Are Required");
            $("#btnCreateEvent").show();
            $("#btnSpinner").hide();
            return;
        }

        let object = {
            "eventDescription": eventDescription,
            "eventName": eventName,
            "eventDateTime": eventDateTime,
            "feat_icon" : feat_icon
        };

        uploadEvent(object);
    });

    function uploadEvent(object) {
        let formData = generateFormData(object);
        let requestObject = new XMLHttpRequest();
        requestObject.open("POST", "https://projects.deelesisuanu.com/elliot-events/createEvent");
        requestObject.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                $(".customiseText").show();
                $(".customiseText").css("background-color", (response.status) ? "#224244" : "#9b2915");
                $(".customiseText").html(response.text);
                $("#btnCreateEvent").show();
                $("#btnSpinner").hide();
                eventData();
            }
        };
        requestObject.send(formData);
    }

});