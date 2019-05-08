/**
 * Liste des évenement https://developer.mozilla.org/fr/docs/Web/API/Event
 */

/* ------------------------------------
Ajout d'événement
--------------------------------------- */

var p = document.querySelector('p');

//ajout d'un écouteur d'événment
/*p.addEventListener('click', function() {
    p.classList.toggle('red');
});*/

var ps = document.querySelectorAll('p');
for( var i = 0; i < ps.length; i++) {
    var p = ps[i];
    p.addEventListener('click', function() {
        //dans une fonction listener/écouteur this ne contient pas le contexte global mais l'élément auquel est lié l'écouteur 
        this.classList.toggle('red');
    })
}

//la fonction écouteur prend en paramètre l'événement déclenché
//NB : l'option "Preserve log" dans la console navigateur permet de préserver les logs meme si on change de site
var liens = document.querySelectorAll("a.external");
for (var i =0; i < liens.length; i++) {
    var lien = liens[i];
    lien.addEventListener('click', function (e) {
        //e.stopPropagation();
        console.log("J'ai cliqué sur le lien", e);
        var response = window.confirm("Voulez-vous vraiment quitter le site");
        if (response === false) {
            e.preventDefault();
        }
    });
}

/* ------------------------------------
La propagation
--------------------------------------- */
document.querySelector('#propagation').addEventListener('click', function (e) {
    e.preventDefault();
    console.log("J'ai cliqué sur le paragraphe", e);
    // difference target et currentTarget
    // target = l'élément réellement ciblé : click sur le p = p, click sur le lien dans le p = le lien
    // currentTarget = l'élément auquel est lié l'événement : click sur le p = p, click sur le lien dans le p = p
    //NB : la propagation doit etre active pour voir les infos lorsque l'on clique sur le a
    console.log(e.target, e.currentTarget);

});
// Un clic sur le lien inclut dans le paragraphe va afficher "J'ai cliqué sur le lien" puis "J'ai cliqué sur le paragraphe"
// L'événement click déclenché sur le lien déclenche l'événement click sur l'élément parent => l'événement est propagé vers les parents
// utilisation de e.stopPropagation sur l'élément enfant pour éviter la propagation de l'événement

/* ------------------------------------
Supression d'événement
--------------------------------------- */
var div = document.querySelector('#remove');
var onClick = function(e) {
    this.classList.add('red');
    console.log('Rouge');
    e.preventDefault();
    // pour que le rouge ne se mette qu'au premier clic (une fois suffit) on supprime l'événement
    div.removeEventListener('click', onClick);
};
div.addEventListener('click', onClick);


/* ------------------------------------
Evenement de formulaire
--------------------------------------- */
/* Sur les champs de formulaire 
*************************************/
// s'affiche lorsque l'on change la valeur & que l'on quitte le champs 
document.querySelector('#a').addEventListener('change', function (e) {
    console.log(e);
});

// s'affiche lorsque l'on relache le bouton donc dès que l'on a fini de taper une lettre 
document.querySelector('#a').addEventListener('keyup', function (e) {
    console.log(String.fromCharCode(e.keyCode));
});

// s'affiche lorsque l'on appui sur le bouton donc dès que l'on commence à taper une lettre 
document.querySelector('#a').addEventListener('keydown', function (e) {
    //exemple pour empecher de taper certains caractères
    var lettre = String.fromCharCode(e.keyCode);
    if(lettre != "A") {
        e.preventDefault();
        //NB : tous les événements ne sont pas annulable, keydeown l'est
    }
});

// focus
document.querySelector('#cp').focus();
// blur pour enlever le focus

/* Soummission de formulaire 
*************************************/
document.querySelector("#form").addEventListener('submit', function (e) {
    var cp = document.querySelector("#cp");
    var mentions = document.querySelector("#mentions");
    var age = parseInt(document.querySelector("#age").selectedOptions[0].value);
    if (cp.value.length != 5) {
        alert("Le code postal n'est pas bon");
        e.preventDefault();
    }
    if(mentions.checked === false) { //if(!mentions.checked)
        alert("Vous n'avez pas accepter les CGU");
        e.preventDefault();
    }
    if( age < 18 ) {
        alert("Vous ne pouvez pas rentrer");
        e.preventDefault();
        
    }

});

/* ------------------------------------
Evenement sur la page
--------------------------------------- */
//pour excuter des actions une fois la page chargée
document.addEventListener('DOMContentLoaded', function () {
    var b = document.querySelector('#b');
    console.log(b.value);
})
