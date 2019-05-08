
/* -------------------------------
 Présentation de l'objet Window
-------------------------------- */
console.log("++ Exemple 1 ++");
//accès à l'objet window
console.log(window);

//window est l'objet racine du contexte navigateur
//tous les éléments globaux y sont rattachés comme les variables
var a = "Demo";
console.log(a); //affiche "Demo"

//la variable a sera écrasée si elle est modifiée dans un autre script js

//pour créer des contextes isolés du contexte racine/global window on utilise des IIFE (Immediately Invoked Function Expression)
(function() {
    var a = "Demo2";
    console.log(a); //affiche "Demo2"
})();

console.log(a); //affiche "Demo"

/* ------------------------------------
Méthodes principales de l'objet Window
--------------------------------------- */

/* Méthodes pour intéragir avec l'utilisateur
***********************************************/
//NB : window étant le contexte global il est possible d'ommettre le window lors de l'appel des méthodes
console.log("++ Exemple 2 ++");
/*(function() {
    //alert pour afficher une popup
    //bloque l'exécution du script
    window.alert("Salut les gens");
    console.log("alert");

    //prompt pour récupérer des entrées utilisateur
    var demo = window.prompt("Entre une donnée");
    console.log(demo);

    //confirm pour demander confirmation
    var validation = window.confirm("Etes-vous d'accord ?");
    console.log(validation);

})();*/

// Exercice : devine le nombre ///////
/*(function () {
    var nombre = Math.floor(Math.random() * 10);
    console.log(nombre);
    var reponse = window.prompt("Devine le nombre");
    var essais = 3;
    while (parseInt(reponse) != nombre && essais > 0) {
        essais--;
        if ( reponse < nombre ) {
            window.alert("Le nombre est trop petit.");
        } else {
            window.alert("Le nombre est trop grand.");
        }
        if(essais > 0) {
            reponse = window.prompt("Devine le nombre");
        }
    }
    if(parseInt(reponse) == nombre) {
        window.alert("Bravo tu as trouvé !");
    } else {
        window.alert("Echec !");
    }
   
})();*/

/* Méthodes timers
***********************************************/
console.log("++ Exemple 3 ++");
/*(function () {
    //setInterval pour éxécuter une instruction tous les X intervalles de temps
    var demo = function () {
        console.log('demo');
    }
    var timer1 = window.setInterval(demo, 1000);

    //exemple avec un compteur
    var i = 0;
    var timer2 = window.setInterval(function () {
        i++;
        console.log(i);
        if(i === 10) {
            //clearInterval pour stopper setInterval
            window.clearInterval(timer2);
            //après l'arret du timer2 => arret du timer1
            window.clearInterval(timer1);
        }
    }, 1000);

    // les instructions en déhors des fonctions d'intervalles sont excécutées immédiatement
    console.log("Id du timer2 : " + timer2);

    //setTimout pour exécuter une seule fois l'instruction au bout de X temps
    window.setTimeout(function () {
        console.log("timeout");
        //clearTimout pour stopper setTimeout;
    }, 2000);
   
})();*/

console.log("++ Exemple 4 ++");
//faire attention aux closures (= fonction/structure utilisant des variables qui existe en dehors de son contexte)
(function () {
    for (var i = 0; i < 10; i++) {
        window.setTimeout(function() {
            console.log(i)
        }, 1000)
    }
    //affiche 10 fois 10 car la boucle est arrivée à la fin de son exécution avant que les timouts s'exécutent (différés d'une seconde) 
    //et donc i vaut 10 au moment ou les timouts l'affiche (i est dans le contexte global)

    // pour afficher un i égal à chaque incrément au moment où les timeouts s'exécutent
    // il faut utiliser une IIFE dans chaque tour de boucle en lui passant en paramètre l'incrément (l'incrément sera stocké dans le scope de l'IIFE)
    for (var i = 0; i < 10; i++) {
        (function (j) {
            window.setTimeout(function() {
                console.log(j)
            }, 1000);
        })(i)
    }
})();