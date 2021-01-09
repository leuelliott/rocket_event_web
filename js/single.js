function eventData(id) {
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", `https://projects.deelesisuanu.com/elliot-events/eventData?eid=${id}`);
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
                    $("#eventTitle").html(element.name);
                    $("#eventdesc").html(element.description);
                    $("#eventDateTime").html(element.fullDate);
                    $("#eventImg").attr("src", element.icon);
                    $("#rowMainer").show();
                }
            }
            $("#rowSpinner").hide();
        }
    };
    requestObject.send();
}

$(document).ready(function () {
    
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eid');

    eventData(eventId);

    function generateFormData(object) {
        let formData = new FormData();
        Object.keys(object).forEach((key) => formData.append(key, object[key]));
        return formData;
    }
    
    $("#btnBookEvent").on("click", function () {

        $("#btnBookEvent").hide();
        $("#btnSpinner").show();

        const fullName = $("#fullName").val();
        const emailAddress = $("#emailAddress").val();
        const countryCode = $("#countryCode").val();
        let phoneNumber = $("#phoneNumber").val();

        if (fullName == "" || emailAddress == "" || countryCode == ""|| phoneNumber == "") {
            $(".customiseText").show();
            $(".customiseText").css("background-color", "#9b2915");
            $(".customiseText").html("All Fields Are Required");
            $("#btnBookEvent").show();
            $("#btnSpinner").hide();
            return;
        }

        phoneNumber = countryCode + "" + phoneNumber;
 
        let object = {
            "fullName": fullName,
            "emailAddress": emailAddress,
            "phoneNumber": phoneNumber,
            "eventId": eventId
        };

        bookEvent(object);

        function bookEvent(object) {
            let formData = generateFormData(object);
            let requestObject = new XMLHttpRequest();
            requestObject.open("POST", "https://projects.deelesisuanu.com/elliot-events/bookEvent");
            requestObject.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    $(".customiseText").show();
                    $(".customiseText").css("background-color", (response.status) ? "#224244" : "#9b2915");
                    $(".customiseText").html(response.text);
                    $("#btnBookEvent").show();
                    $("#btnSpinner").hide();

                    setTimeout(function () {
                        $(".customiseText").hide();
                    }, 5000);
                }
            };
            requestObject.send(formData);
        }

    });


});