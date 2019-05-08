# Les variables #
Une variable doit être déclarée avec le mot-clé var (ou let et const à partir d'ES6). 
Si la déclaration n'est pas faite cela n'entraine pas d'erreur mais c'est une mauvaise pratique. Et un warning sera levé si le mode 'use strict' est utilisé.

Le nom des variables ne peut pas commencer par un chiffre ou un caractère spécial.
Le nom doit commencer par un lettre puis il peut contenir des lettres/des chiffres/le caractère underscore et dollar.

JS est un langage de typage faible, cela signifie que le type d'une variable peut changer au cours de l'exécution au gré des affectations.
Cela induit également des conversions de type automatiques lors d'opérations ([lien règles de conversion automatique]).
Il existe des fonctions pour forcer les conversions/le typage ([lien fonctions de conversion]).

## Portée de variables ##
Les variables déclarées à l'intérieur d'une fonction sont dites locales et n'exsite qu'à l'intérieur de la fonction

Les variables déclarées dans le script sont dites globales et sont utilisables partout. Y compris dans les fonctions.
NB : ES6 permet de changer se comportement avec le mot-clé let permettant de limiter la portée d'une variable au scope du script uniquement

# Les structures #

## Les conditions ##
### if ###
```
if(condition1) {

} else {

}
```
```
if (condition1) {

} else if (condition2) {

} else {

}
```

### switch ###

### opérateur ternaire ###

## Les boucles ##
### for ###
La variable de boucle (i) continue à exister en dehors la boucle. NB : ES6 permet de changer se comportement avec le mot-clé let permettant de limiter la portée d'une variable au scope d'une structure.
### while ###
### do while ###
### for...in ###


# Les fonctions

## Les fonctions natives ##
Il existe quelques fonctions globales (comme parseInt(), isNaN()) mais la plupart des fonctions natives sont liées à des objets. Javascript ne possède pas beaucoup d'objets nativement mais ils sont très utiles (ex Math).
Les méthodes peuvent être liées à l'objet (Number.methodeA(arg)) ou aux instances de l'objet (var int = 2; int.methodeI()) *=> Objet.prototype.methodeI() dans la donc MDN*


## Création de fonctions ##
Il st possible de créer ces propres fonctions.

Il n'est pas possible de mettre des valeurs par défaut aux paramètres, `function multiplie (a, b=0)` n'est pas possible.
Javascript ne vérifie pas les paramètres, il met `undefined` aux paramètres non définis/sans valeur transmise. 
Il n'y a donc pas de notion de paramètre obligatoire/facultatif intégrée. Il faut vérifier les paramètres attendus à l'intérieur de la fonction.

## Les fonctions anonymes ##
Les fonctions anonymes peuvent être utiles pour :
- isoler du code avec les IIFE (Immediately-Invoked Function Expression) : 
```
(function() {
    // Code isolé
})();
```
- en callback de méthodes (ex map, forEach de l'objet Array)
- en paramètre de fonctions temporelles (ex setTimeout())
- la gestion des événements
- la gestion d'appels asynchrones (ex appels Ajax)


# Les objets #

## Les objets littéraux ##
Un objet littéral est créé grâce à une paire d'accolade {}. C'est un tableau indexé par des identifiants (équivalent des tableaux associatifs en PHP).
```
var myobject = {}

var myobjectwithvalues = {
    prop1: value1
    prop2: value2
}
```
Les objets littéraux peuvent se révéler utile pour ordonner un code (créer des "espaces de noms"). 
Ils sont aussi pratique dans les fonctions qui doivent retourner plusieurs valeurs.

## Les objets constructeurs ##
Un objet constructeur : 
- est défini par une fonction constructeur,
- est instancié grâce au mot-clé new

Liste des constructeurs natifs les plus connus et utilisés en JavaScript :

Object()
String()
Number()
Boolean()
Array()
RegExp()
Function()
Date()

### Fonction constructeur ###

Il est possible de créer ses propres objets constructeurs en définissant un constructeur. Un constructeur est une fonction. Cette fonction contient une particularité : le mot-clé **this**.
Pour que la fonction fonctionne en tant que constructeur, il faut utiliser le mot-clé new pour créer des instances du type d'objet défini.

*NB : par convention on met une majuscule à la première lettre d'un constructeur. Cela permet de mieux le différencier d'une fonction « normale ».*

### Définition des méthodes ###
Il y a deux manières de définir une méthode pour un objet : 
- dans le constructeur :
```
function Person(nick, age, sex, parent, work, friends) {
    this.nick = nick
    this.age = age
    this.sex = sex
    this.parent = parent
    this.work = work
    this.friends = friends

    this.addFriend = function(nick, age, sex, parent, work, friends) {
        this.friends.push(new Person(nick, age, sex, parent, work, friends))
    }
}
```

- via prototype
```
Person.prototype.addFriend = function(nick, age, sex, parent, work, friends) {
    this.friends.push(new Person(nick, age, sex, parent, work, friends))
}
```
*NB : les méthodes ajoutées via prototype  ne sont pas copiées dans les instances de l'objet. Autrement dit, l'instance ne possèdera pas la méthode directement dans son propre objet, elle sera disponible dans son objet constructeur (dans l'exemple Person). 
Cela veut dire qu'une modification sur une méthode contenue dans un prototype affectera toutes les instances (y compris celles qui sont déjà créées), cette solution est donc à privilégier.*

### Modifier le contexte d'une méthode ###
Une méthode utilise généralement le mot-clé this pour savoir à quel objet elle appartient. Les deux méthodes apply() et call() permettent de rediriger la référence du mot-clé this vers un autre objet.

Ex : appliquer la méthode toString() de l'objet Object sur un objet Array afin d'obtenir sous forme de chaîne de caractères le type du tableau au lieu de son contenu :
```
var result = Object.prototype.toString.call(['test']);

alert(result); // Affiche : « [object Array] »
```

### Héritage ###
Il est possible, en JavaScript, d'appliquer le concept d'héritage aux objets.

Ex : d'une voiture et d'un camion faisant appel à un parent nommé Vehicule 
```
// Constructeur parent 
//////////////////
function Vehicle(licensePlate, tankSize) {
    this.engineStarted = false; // Notre véhicule est-il démarré ?
    this.licensePlate = licensePlate; // La plaque d'immatriculation de notre véhicule.
    this.tankSize = tankSize; // La taille de notre réservoir en litres.
}

// Permet de démarrer notre véhicule.
Vehicle.prototype.start = function() {
    this.engineStarted = true;
};

// Permet d'arrêter notre véhicule.
Vehicle.prototype.stop = function() {
    this.engineStarted = false;
};

// Constructeur Voiture
///////////////////////////////
function Car(licensePlate, tankSize, trunkSize) {
    // On appelle le constructeur de « Vehicle » par le biais de la méthode
    // call() afin qu'il affecte de nouvelles propriétés à « Car ».
    Vehicle.call(this, licensePlate, tankSize);

    // Une fois le constructeur parent appelé, l'initialisation de notre objet peut continuer.
    this.trunkOpened = false; // Notre coffre est-il ouvert ?
    this.trunkSize = trunkSize; // La taille de notre coffre en mètres cube.
}

// L'objet prototype de « Vehicle » doit être copié au sein du prototype
// de « Car » afin que ce dernier puisse bénéficier des mêmes méthodes.
Car.prototype = Object.create(Vehicle.prototype, {
    // Le prototype copié possède une référence vers son constructeur, actuellement
    // défini à « Vehicle », nous devons changer sa référence pour « Car »
    // tout en conservant sa particularité d'être une propriété non-énumerable.
    constructor: {
        value: Car,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

// Il est bien évidemment possible d'ajouter de nouvelles méthodes.
Car.prototype.openTrunk = function() {
    this.trunkOpened = true;
};

Car.prototype.closeTrunk = function() {
    this.trunkOpened = false;
};
```
*NB : plus d'infos sur Object.create https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create*

# Les polyfills et les wrappers #

## Polyfill ##
Un polyfill est un script qui a pour but de fournir une technologie à tous les navigateurs. Une fois implémenté, un polyfill a deux manières de réagir :
- Le navigateur supporte la technologie souhaitée, le polyfill ne va alors strictement rien faire
- Le navigateur ne supporte pas la technologie souhaitée, le polyfill va alors « imiter » cette technologie grâce à diverses astuces pour permettre de l'utiliser comme si elle était disponible nativement.

Dans la pratique, il est peu utile de définir des polyfills, la plupart ayant déjà été développés : rechercher sur MDN et Google.

Exemples :
- Méthode trim() de l'objet String : https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
- Méthode isArray() de l'objet Array : https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray#Compatibility
- Méthode forEach() de l'objet Array : https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach#Compatibility

## Wrapper ##

Il peut être utile de modifier certains objets natifs. 
Une moyen simple est de le faire via le prototype de l'objet natif. Cependant c'est une pratique non conseillée, cela peut entrainer des problèmes de compatibilité ou de fonctionnement. De plus cela ne fonctionne pas avec tous les objets (notamment les objets du DOM).

Une autre solution est l'utilisation d'un wrapper. C'est un code qui a pour but d'encadrer l'utilisation de certains éléments du JavaScript. Il peut ainsi contrôler la manière dont ils sont employés et peut réagir en conséquence pour fournir des fonctionnalités supplémentaires aux développeurs.
Dans l'idéal, un wrapper doit permettre au développeur de se passer de l'élément original, ainsi le travail ne s'effectuera que par le biais de la surcouche que constitue le wrapper.

Le wrapper peut donc permettre d'ajouter des propriétés ou des méthodes aux objets, en particulier les objets natifs, en créant un objet dérivé de l'objet en question.

Ex d'un wrapper pour l'objet Image qui permet aux développeurs de définir une méthode onload sans modifier l'objet Image natif :

```
 function Img(src) {

    var obj = this; // Nous faisons une petite référence vers notre objet Img. Cela nous facilitera la tâche.

    this.originalImg = new Image(); // On instancie l'objet natif, le wrapper servira alors d'intermédiaire

    this.complete = false;
    this.onload = function() {}; // Voici l'événement que les développeurs pourront modifier

    this.originalImg.onload = function() {

        obj.complete = true; // L'image est chargée !
        obj.onload(); // On exécute l'événement éventuellement spécifié par le développeur

    };

    if (src) {
        this.originalImg.src = src; // Si elle est spécifiée, on défini alors la propriété src
    }

}

Img.prototype.set = function(name, value) {

    var allowed = ['width', 'height', 'src'], // On spécifie les propriétés dont on autorise la modification
        wrapperProperties = ['complete', 'onload'];

    if (allowed.indexOf(name) != -1) {
        this.originalImg[name] = value; // Si la propriété est autorisée alors on la modifie
    } else if (wrapperProperties.indexOf(name) != -1) {
        this[name] = value; // Ici, la propriété appartient au wrapper et non pas à l'objet natif
    }

};

Img.prototype.get = function(name) {

    // Si la propriété n'existe pas sur le wrapper, on essaye alors sur l'objet natif :
    return typeof this[name] != 'undefined' ? this[name] : this.originalImg[name];

};
```

Utlisation du wrapper :
```
var myImg = new Img(); // On crée notre objet Img

alert('complete : ' + myImg.get('complete')); // Vérification de la propriété complete : elle est bien à false

myImg.set('onload', function() { // Affichage de diverses informations une fois l'image chargée
    alert(
        'complete : ' + this.get('complete') + '\n' +
        'width : ' + this.get('width') + ' px\n' +
        'height : ' + this.get('height') + ' px'
    );
});

myImg.set('src', 'http://www.sdz-files.com/cours/javascript/part3/chap9/img.png'); // On spécifie l'adresse de l'image
```

Dans la pratique, le développeur utilise des wrappers plutot qu'il n'en créé. Les wrappers étant mis en place dans de nombreuses bibliothèques JavaScript. En effet, ils ont l'avantage de permettre une gestion simple du langage sans pour autant l'altérer.

# Concepts avancées #

## Les closures ##
Il s'agit d'une fonction ayant pour but de capter des données susceptibles de changer au cours du temps, de les enregistrer dans son espace fonctionnel et de les fournir en cas de besoin. 

Les closures existent sous plusieurs formes et pour plusieurs cas d'utilisation afin de résoudre différents problèmes. Mais le schéma classique est l'utilisation d'une IIFE avec une fonction anonyme à l'intérieur. 

Ex : utilisation d'une boucle pour faire apparaître des balises `<div>` de manière progressive, les unes à la suite des autres :
```
var divs = document.getElementsByTagName('div'),
    divsLen = divs.length;

for (var i = 0; i < divsLen; i++) {

    (function(i) {

        setTimeout(function() {
            divs[i].style.display = 'block';
        }, 200 * i);

    })(i);

}
/*
A chaque tour de boucle, une IIFE est créée en lui passant en paramètre la valeur i de la boucle. Chaque IFFE lance l'exécution différée d'une fonction anonyme utilisant ce paramètre. Dans chaque IFFE le paramètre i est différent, il s'agit d'une référence différente contrairement au tour de boucle où la référence à i est toujours la même. 
Autrement dit sans l'IFFE le callback du setTimeout serait lancé 10 fois l'une après l'autre mais avec la même valeur de i. Celle affectée à la fin de la boucle, qui finit de s'exécuter avant que les callbacks soit lancés.
*Pour rappel, *
- les paramètres de fonction sont passés par copie
- chaque IFFE est un "espace" indépendant qui n'accède ni à l'espace global (et inversement) ni à l'espace des autres IIFE.
*/
```

## Les appels asynchrones (Ajax)##


## Les promesses ##