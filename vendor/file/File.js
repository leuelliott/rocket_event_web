class File
{
    constructor(){
    }

    static getBase64(file, id) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            document.getElementById(id).value = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
    static changeImage3(currentId, targetId) {
        
        document.getElementById(targetId).value = "";
        // document.getElementById(currentId).value = "";

        var file = document.querySelector('#'+currentId).files[0];
        var file_size = file.size;
        
        if(document.getElementById("path_course_img3")){
            document.getElementById("path_course_img3").innerHTML = file.name;
        }
        
    }
    
    static changeImage2(currentId, targetId) {
        
        document.getElementById(targetId).value = "";
        // document.getElementById(currentId).value = "";

        var file = document.querySelector('#'+currentId).files[0];
        var file_size = file.size;
        
        if(document.getElementById("path_course_img2")){
            document.getElementById("path_course_img2").innerHTML = file.name;
        }
        
    }
    
    static changeImage01(currentId, targetId) {
        
        document.getElementById(targetId).value = "";
        // document.getElementById(currentId).value = "";

        var file = document.querySelector('#'+currentId).files[0];
        var file_size = file.size;
        
        if(document.getElementById("path_course_img01")){
            document.getElementById("path_course_img01").innerHTML = file.name;
        }
        
        if(file_size > 1048576) {
            alert("Sorry please select smaller file");
            document.getElementById(currentId).value = "";
        }
        else{
            File.getBase64(file, targetId);
        }
    
    }
    
    static changeImage(currentId, targetId) {
        
        document.getElementById(targetId).value = "";
        // document.getElementById(currentId).value = "";

        var file = document.querySelector('#'+currentId).files[0];
        var file_size = file.size;
        
        if(document.getElementById("path_course_img")){
            document.getElementById("path_course_img").innerHTML = file.name;
        }
        
        if(file_size > 1048576) {
            alert("Sorry please select smaller file");
            document.getElementById(currentId).value = "";
        }
        else{
            File.getBase64(file, targetId);
        }
    
    }
    
    static changeImages(currentId, targetId) {
        
        var file = document.querySelector('#'+currentId).files[0];
        var file_size = file.size;
        
        if(file_size > 1048576) {
            alert("Sorry please select smaller file");
            document.getElementById(currentId).value = "";
        }
        else{
            getBases64(file, targetId);
        }
    
    }
    
    static getBases64(file, id) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var cur = document.getElementById(id).value;
            console.log(cur);
            if(cur == ""){
                var arr = [];
                var obj = {
                    img : reader.result
                };
                arr.push(obj);
                // document.getElementById(id).value = JSON.stringify(obj);
                document.getElementById(id).value = JSON.stringify(arr);
            }
            else{
                var curs = document.getElementById(id).value;
                var os = {
                    img : reader.result
                };
                curs = JSON.parse(curs);
                var obs = curs.push(JSON.stringify(os));
            }
            // document.getElementById(id).value = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
}