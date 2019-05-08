
**Les scripts javascript doivent être placés** dans un fichier externe à la page HTML. 
Pour une question de performances il faut placer la balise `<script>` à la fin de la page, juste avant `</body>`

```
<!DOCTYPE html>
<html>
<head>
    <title>Inclusion de fichier javascript dans une page</title>
</head>

<body>
    <!-- 

        tout le contenu de la page 

    -->



    <script src="fichier.js"></script>
</body>
</html>
```

- - -

**L'utilisation de eval()** est à éviter absolument. Cette fonction démarre le compilateur javascript, ça mange de la mémoire et c'est lent à démarrer. Les performances sont donc mauvaises. De plus, le code contenu dans eval() ne peut pas être optimisé par le compilateur JS.

- - -

**Il ne faut jamais passer de chaine de caractère en paramètre des fonctions setTimeout() et setInterval()**. En passant une chaine de caractères en paramètre, ces fonctions appellent eval()

```
// pour exécuter une fonction sans paramètre
setInterval(maFonction, 1000);

// si il faut passer des paramètres à notre fonction du futur, il faut l'englober 
// dans une fonction anonyme qui contient l'appel à notre fonction paramétré.
setInterval(function () { 
    maFonction(parametre1, parametre2); 
}, 5000);

// une méthode plus élégante qui malheureusement ne marche pas sous IE
setTimeout(maFonction, 5000, parametre1, parametre2 /*, etc. */);
```

- - -

**Le préfixe javascript: dans une balise `<a>` est une relique honteuse d'une autre époque.**
Dans l'attribut href d'un lien doit figurer une URI valide qui pointe effectivement sur une ressource (dans ce cas javascript: est traité comme un protocole. Protocole qui n'existe pas).
Remplacer l'URI par une ancre vide, le fameux `<a href="#" onclick="action();">action</a>` , est aussi mauvais car si JS inactif le lien ne fonctionne pas et sert à rien.

Il faut utiliser les standards : 
`<a href="/supprimer/id" onclick="return confirm('Supprimer cet objet ?');">supprimer l'objet</a>`
Dans ce cas si JS n'est pas actif, le lien et la fonctionnalité associée continueront de fonctionner.
*NB : si le lien ne doit pas être suivi c'est dans le onclick que cela doit être gérée (un return false systématique ou un preventDefault)*

Pour les actions ne possédant pas d'url la balise consacrée est nommée `<button>`

- - -

**Proscrire `document.write()`**. Le comportement de cette fonction est problématique. Lors du chargement d'une page HTML cette fonction ajoute la chaine passée en paramètre au contenu. Une fois la page chargée, cette fonction remplace totalement le HTML de la page par la chaine en paramètre.

Le chargement d'une page HTML est séquentiel, c'est un exercice périlleux pour le navigateur que de rajouter du contenu à une page en train de charger. Si c'est périlleux, les bugs ne sont pas loin. 


- - -

**Privilégier la notation littérale des objets natifs**.

```
// Les tableaux
// constructeur: Array
var tab = [];// un nouveau tableau vide
var tab = ['zéro','un','deux','trois'];// avec du monde dedans


// Les objets
// constructeur: Object
var obj = {}; // un objet vide
var obj = { // avec du monde dedans
    propriete: "valeur",
    methode:function () {}
};

// Les expressions régulières
// constructeur: RegExp
var reg = /\d+/ig; // une regex

Privilégier les valeurs primitives pour les objets natifs en possédant (Boolean, String, Number)
```

