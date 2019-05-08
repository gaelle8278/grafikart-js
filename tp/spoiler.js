
//exemple 1
var button = document.querySelector(".spoiler button");
button.addEventListener('click', function () {
    this.nextElementSibling.classList.add('visible');
    this.parentNode.removeChild(this);
});

//exemple 2
(function() {
    var elements = document.querySelectorAll(".spoiler2");
    var createSpoilerButton = function (element) {
        //on crée le bouton pour afficher le spoiler
        var button = document.createElement('button');
        button.textContent = 'Afficher le spoiler';

        //on créer la span qui contient le spoiler
        var span = document.createElement('span');
        span.className = 'spoiler2-content';
        span.innerHTML = element.innerHTML;

        //on vide l'élément
        element.innerHTML = "";

        //on ajoute les éléments au DOM
        element.appendChild(button);
        element.appendChild(span);

        //on ajoute l'écouteur au click
        button.addEventListener('click', function () {
            button.parentNode.removeChild(button);
            span.classList.add('visible');
        })

    }
    for (var i = 0; i < elements.length; i++) {
        createSpoilerButton(elements[i]);
}
})();