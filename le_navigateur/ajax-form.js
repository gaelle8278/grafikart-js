var getHttpRequest = function () {
    var httpRequest = false;
    
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
    }

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }

    return httpRequest;
}


var linkJSON = document.querySelector("#link_json");
var result_json = document.querySelector('#result_json');
linkJSON.addEventListener('click', function (e) {
    e.preventDefault();
    result_json.innerHTML = "Chargement ...";
    var httpRequest = getHttpRequest();
    httpRequest.onreadystatechange = function() {
        if( httpRequest.readyState == 4) {
            if(httpRequest.status === 200) {
                result_json.innerHTML = httpRequest.responseText;
                
            } else {
                alert('impossible de traiter la demande');
            }
    
        }

    };
    httpRequest.open('POST', "ajax-form.php", true);
    //compatible tout navigateur
    /* 
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    var a = "mont&pellier=1"
    httpRequest.send("city=" + encodeURIComponent(a) + "&cp=75008");
    */

    //FormData à partir de IE10
    var data = new FormData();
    data.append('city',  "mont&pellier=1");
    data.append('name', 'Marie');
    httpRequest.send(data);
});


var form = document.querySelector("#form");
var result_form = document.querySelector('#result_form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    result_form.innerHTML = "Chargement ...";
    var httpRequest = getHttpRequest();
    httpRequest.onreadystatechange = function() {
        if( httpRequest.readyState == 4) {
            if(httpRequest.status === 200) {
                result_form.innerHTML = httpRequest.responseText;
                
            } else {
                alert('impossible de traiter la demande');
            }
    
        }

    };
    httpRequest.open('POST', "ajax-form.php", true);
  
    //FormData à partir de IE10
    //envi des données du formulaire une par une
    /*var data = new FormData();
    var input = document.querySelector('#q');
    data.append('q',  input.value);*/
    //on laisse FormData traiter les champs du formulaire
    var data = new FormData(form);
    httpRequest.send(data);
});