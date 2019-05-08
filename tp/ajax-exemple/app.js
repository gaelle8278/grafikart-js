var getHttpRequest = function () {
  var httpRequest = false;

  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml');
    }
  }
  else if (window.ActiveXObject) { // IE
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

  return httpRequest
}

//récupération du formulaire
var form = document.querySelector('#contact')
//ré"cupération du bouton de soummisssion
var button = form.querySelector('button[type=submit]')
var buttonText = button.textContent

//lors de la soummssion du formulaire ....
form.addEventListener('submit', function (e) {
    //la soummission classique est empechée
    e.preventDefault()

    //le bouton submit est désactivé et son texte est changée
    button.disabled = true
    button.textContent = 'Chargement...'

    //suppression des messages d'erreur déjà présents
    var errorElements = form.querySelectorAll('.has-error')
    for(var i = 0; i < errorElements.length; i++) {
        errorElements[i].classList.remove('has-error')
        var span = errorElements[i].querySelector('.help-block')
        if (span) {
            span.parentNode.removeChild(span)
        }
    }

    //traitement de la réponse suite appel ajax    
    var data = new FormData(form)
    var xhr = getHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                //s'il y a des erreurs dans le formulaire lors de la soummission => récupération et affichage des erreurs
                var errors = JSON.parse(xhr.responseText)
                var errorsKey = Object.keys(errors)
                for (var i = 0; i < errorsKey.length; i++) {
                    var key = errorsKey[i]
                    var error= errors[key]
                    var input = document.querySelector('[name='+ key + ']')
                    var span = document.createElement('span')
                    span.className = 'help-block'
                    span.innerHTML = error
                    input.parentNode.classList.add('has-error')
                    input.parentNode.appendChild(span)
                }
            } else {
                // si tous les champs sont ok => traitement après soummission correcte du formulaire
                var results = JSON.parse(xhr.responseText)
                alert(results.success)
                //après soummission correcte les champs du formulaire sont vidés
                var inputs = form.querySelectorAll('input, textarea')
                for(var i = 0; i < inputs.length; i++) {
                    inputs[i].value = ""
                }
            }
            //arès traitement de la réponse le bouton submit est réactivé 
            //et son texte d'origine remis en place
            button.disabled = false
            button.textContent = buttonText
        }
    }
    //envoi des données du formulaires en ajax
    xhr.open('POST', form.getAttribute('action'), true)
    //header nécessaire pour détecter l'appel coté script de traitement PHP (header automatiquement ajouté par JQuery)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send(data)

})