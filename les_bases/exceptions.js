var a ={};

/*---------------------------
Capture des erreurs générées 
----------------------------- */
console.log("++ Exemple 1 ++");
try {
    a.maMethode();
} catch (e) {
    console.log("J'ai rencontré une erreur " + e.stack);
} finally {
    console.log("Code qui s'exécute quoiqu'il arrive. Qu'il y ai une erreur ou pas.");
}
//ici mettre un finally ne fait pas de différence avec une instruction placée après le try/catch 
try {
    a.maMethode();
} catch (e) {
    console.log("J'ai rencontré une erreur " + e.stack);
}
console.log("Code exécuté après le try/catch. Dans tous les cas, qu'il y ait une erreur ou non");

// Le finally est interressant si l'on ne veut pas faire de catch. 
// Le code dans le finally s'excéutera dans tous les cas.
// Cependant si une erreur est générée, le code après le finally ne sera pas exécutée (car l'erreur n'est pas capturée)
/*try {
    a.maMethode();
} finally {
    console.log("Code qui s'exécute même si un message d'erreur s'affiche parce que l'erreur n'est pas capturée.")
}*/

/* -------------------------------
Création d'un renvoi d'erreur 
-------------------------------- */
var demo = function (nombre) {
    if(nombre > 5) {
        throw new Error('Le nombre est supérieur à 5.');
    }
    var resultat = nombre * 2;
    if (Number.isNaN(resultat)) {
        throw new Error('Le paramètre n\'est pas un nombre');
    }
    return resultat;
}

console.log("++ Exemple 2 ++");
try {
    console.log(demo(6));
} catch (e) {
    console.log(e);
}

console.log("++ Exemple 3 ++");
try {
    console.log(demo("aze"));
} catch (e) {
    console.log(e.message);
}


console.log("fin");

/*
Utiliser un try/catch sur toutes les instructions n'est pas pertinent (et illisible)
L'utilisation de try/catch est utile dans certains cas  comme lors de l'utilisation de librairie externe qui peut générée des erreurs.
La génération d'erreur est utile dans la définition de fonctions à la place du renvoi d'un booléen. Message plus explicite en cas d'erreur.
*/