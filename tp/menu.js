(function() {
    var scrollY = function() {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    /*
    LORSQUE L'ON scroll
        SI l'élément sort de l'écran
        ALORS il devient fixe
    */

    var elements = document.querySelectorAll('[data-sticky]')
    for (var i = 0; i < elements.length; i++) {
        (function (element) {
            //dimensions de l'élément
            var rect = element.getBoundingClientRect();
            var offset = parseInt(element.getAttribute('data-offset') || 0) //équivalent d'une condition ternaire
            //position top de l'élément
            var top = rect.top + scrollY();
            //largeur de l'élément
            var width = rect.width;
            //création d'un mock de memes dimensions que l'élément
            var mock = document.createElement('div')
            mock.style.width = width + "px"
            mock.style.height = rect.height + "px"
            
            //Fonctions
            var onScroll = function() {
                //console.log('scroll')

                var hasFixedClass = element.classList.contains('fixed')
                //ajout de la classe fixed l'élément si le scroll dépasse la position top de l'élément
                //et qu'il n'a pas déjà la classe fixed (évite l'ajout de la classe fixed à chaque scroll mais seulement quand c'est nécessaire)
                if(scrollY() > top - offset && !hasFixedClass) {
                    element.classList.add('fixed')
                    //pour tenir compte des éléments ayant un offset d'affichage par rapport au haut de la page
                    element.style.top = offset + "px"
                    //pour que l'élément garde sa largeur lorsqu'il devient fixed
                    element.style.width = width + "px"
                    //ajout de l'élément qui va prendre la place de l'élément
                    element.parentNode.insertBefore(mock, element)
                } else if (scrollY() < top - offset && hasFixedClass) {
                    element.classList.remove('fixed')
                    //suppression de l'élément mock
                    element.parentNode.removeChild(mock)
                }


            }

            var onResize = function() {
                //suppression des actions appliquées
                element.style.width = "auto"
                element.classList.remove('fixed')
                mock.style.display = "none"

                //recalcul des positions
                rect = element.getBoundingClientRect();
                top = rect.top + scrollY();

                //repositionnement des éléments 
                mock.style.width = rect.width + "px"
                mock.style.height = rect.height + "px"
                mock.style.display = 'block'

                onScroll()

            }

            //Ecouteurs
            //scroll
            window.addEventListener('scroll', onScroll)
            //au changement de taille de la page
            window.addEventListener('resize', onResize)

            
        })(elements[i]);
    }
    
})();