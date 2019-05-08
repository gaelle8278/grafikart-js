
//fonction pour prendre en compte les anciens navigateurs
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

var links = document.querySelectorAll(".meteo");
var result = document.querySelector('#result');
for ( var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', function (e) {
        e.preventDefault();
        result.innerHTML = "Chargement ...";
        var httpRequest = getHttpRequest();
        httpRequest.onreadystatechange = function() {
            if( httpRequest.readyState == 4) {
                result.innerHTML = httpRequest.responseText;
            }

        };
        httpRequest.open('GET', this.getAttribute('href'), true);
        httpRequest.send();

    });
}

var linkJSON = document.querySelector("#link_json");
var result_json = document.querySelector('#result_json');
linkJSON.addEventListener('click', function (e) {
    e.preventDefault();
    result_json.innerHTML = "Chargement ...";
    var httpRequest = getHttpRequest();
    httpRequest.onreadystatechange = function() {
        if( httpRequest.readyState == 4) {
            result_json.innerHTML = '';
            if(httpRequest.status === 200) {
                var results = JSON.parse(httpRequest.responseText);
                var ul = document.createElement('ul');
                result_json.appendChild(ul);
                for ( var i=0; i < results.length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML=results[i].name;
                    ul.appendChild(li);
                }
            } else {
                alert('impossible de traiter la demande');
            }
    
        }

    };
    httpRequest.open('GET', "https://jsonplaceholder.typicode.com/users", true);
    httpRequest.send();

});


