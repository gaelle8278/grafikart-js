// le DOM est l'interface permettant à un script d'intéragir avec le contenu du navigateur (HTML ou XML)
// Par le DOM le contenu est représenté sous forme d'un jeu d'objets reliés selon une structure en arbre

// l'objet document est le DOM en javascript = objet représentant le contenu HTML

/* Méthodes pour récupérer des éléments
***********************************************/
console.log("++ Exemple 1 ++");
//anciennes méthodes
console.log(document.getElementById('demo'));
console.log(document.getElementsByClassName('paragraph'));
console.log(document.getElementsByTagName('p'));

console.log("++ Exemple 2 ++");
//nouvelles méthodes apparues avec Javascript X.x
//sélectionne selon un sélecteur css
    // le premier élément
console.log(document.querySelector('.paragraph'));
    // tous les éléments
console.log(document.querySelectorAll('p'));

console.log("++ Exemple 3 ++");
//pour récupérer le body pas besoin de méthode de sélection : document.body renvoie le body
console.log(document.body);

/* Méthodes pour modifier des éléments
***********************************************/
console.log("++ Exemple 4 ++");
var p = document.querySelector('.paragraph'); 

// modifier la classe 
p.className = "paragraph blue";
console.log(document.querySelector('.paragraph').classList);
p.classList.remove ("blue");
p.classList.add("red");

// modifier le style
p.style.fontSize = "20px";

//modifier le contenu
    //contenu html
p.innerHTML = "<strong>Nouveau contenu</strong>";
    //contenu brut
var p2 = document.querySelector('.demop');
p2.innerText = "<strong>Nouveau contenu</strong>";
//NB : textContent est la version officielle (ECMA) pour modifier le texte brut mais elle n'est pas prise en compte par tous les navigateurs
//innerText est mieux prise en compte mais n'étant standardisée elle n'est pas implémentée de la même façon par tous les navigateurs

// autres exemples
window.setInterval( function () {
    p2.classList.toggle('blue');
}, 1000);

var ps = document.querySelectorAll('.clignotant');
for (var i=0; i < ps.length; i++) {
    (function (p) {
        window.setInterval(function() {
            p.classList.toggle('red');
        }, 1000);
    })(ps[i]);
}

/* Méthodes pour parcourir l'arbre
***********************************************/
console.log("++ Exemple 5 ++");
var liste = document.querySelector('ul');

//récupérer les enfants directs qui sont des éléments
console.log(liste.children);
//récupère tous les enfants directs y compris les noeuds texte
console.log(liste.childNodes);
//premier élément
console.log(ul.firstChild);
console.log(ul.firstElementChild);
//contrairement à children récupère aussi les enfants des enfants
ul.getElementsByTagName('li');

//les éléments frères : nextElementSibling, previousElementSibling

//l'élément parent : parentElement

/* Méthodes pour modifier l'arbre
***********************************************/
//supprimer un élément : removeChild sur l'élément parent

//ajouter un élément à la fin : appendChild sur l'élément parent

//ajouter un élément avant un élément : insertBefore sur l'élément parent
// il n'existe pas de méthode équivalente à insertBefore pour ajouter après un élément

//cloner un élément : cloneNode sur l'élement à cloner

//création dun élément : createElement

//remplacer un élément : replaceChild