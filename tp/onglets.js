//gestion du changement d'onglet
/*
LORSQUE l'on clique sur un onglet 
    ON RETIRE la classe active de l'onglet actif
    ON AJOUTE la classe active à l'onglet actuel

    ON RETIRE la classe active sur le contenu actif
    ON AJOUTE la classe active sur le contenu de l'onglet actuel
*/

//gestion de l'ancre = du contenu de la page lorsque l'on actualise la page dont l'adresse contient l'ancre de l'onglet actif
// si on actualise la page, l'adresse reste celle de l'onglet mais le contenu est le contenu de l'onglet actif par défaut
/*
JE RECUPERE le hash
AJOUTER la classe active sur le lien href="hash"
RETIRER la classe active sur les autres onglets
AFFICHER / MASQUER les contenus
*/

(function () {
    //fonction d'affichage/masquage de l'onglet
    var afficherOnglet = function (a, animations) {
        if(animations === undefined) {
            animations = true;
        }
        var li= a.parentNode; //li sélectionné = onglet à afficher
        var div = a.parentNode.parentNode.parentNode; //conteneur du système d'onglets
        var activeTab = div.querySelector('.tab-content.active'); //contenu actif (= contenu actuellement affiché )
        var aAfficher = div.querySelector(a.getAttribute('href')); //contenu à afficher

        //on a cliqué sur un onglet déja actif => on ne fait rien
        if( li.classList.contains('active') ) {
            return false;
        }
        //on a changé d'onglet actif => on retire et ajoute les classes nécessaires
        //debugger //créé un point d'arret

        //on retire la classe active du li actif
        div.querySelector('.tabs .active').classList.remove('active');
        //on ajoute active sur le li sélectionné
        li.classList.add('active');
        
        if(animations) {
            //système pour faire disparaitre/apparaitre le contenu avec une animation
            /* On ajoute la classe fade et on retire la classe in sur l'élément actif => ça le masque avec la transition
            A la fin de l'animation 
                On retire la classe fade et active à l'élément actif => il n'est plus masqué mais son affichage est supprimé
                On ajoute la classe active et fade à l'élément à afficher => son affichage est rendu visible mais il est masqué
                Puis on ajoute la classe in à l'élément à afficher => le contenu apparait avec la transition
            */
            
            //On lui ajoute la classe fade et on retire la classe in sur l'élément actif
            activeTab.classList.add('fade');
            activeTab.classList.remove('in');
            //à la fin de l'animation sur le contenu actif 
            var transitionEnd = function () {
                //On retire la classe fade et active à l'élément actif
                this.classList.remove('fade');
                this.classList.remove('active');
                //On ajoute la classe active , fade sur l'élément à afficher
                aAfficher.classList.add('active');
                aAfficher.classList.add('fade');
                //instruction qui oblige le navigateur à appliquer les changements css précédents
                // sorte de hack pour forcer le reflow du navigateur et éviter qu'il n'applique le in en meme temps que les autres classe css
                aAfficher.offsetWidth;
                //On ajoute la classe in sur l'élément à afficher
                aAfficher.classList.add('in');
                //on supprime l'écouteur à la fin de l'exécution de l'événement
                //l'écouteur n'a besoin d'etre ajouté qu'une fois, à chaque clic
                activeTab.removeEventListener('transitionend', transitionEnd);

            };
            activeTab.addEventListener('transitionend', transitionEnd);
        } else {
            // suppression la classe active du contenu actif
            activeTab.classList.remove('active');
            //ajout de la classe active sur le contenu du li sélectionné
            aAfficher.classList.add('active');
        }

    }

    //gestion du changement d'onglet
    var tabs = document.querySelectorAll('.tabs a');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this);
        });
    }

    //gestion de l'ancre(hash) et duretour en arrière navigateur
    var hashChange = function(e) {
        var hash = window.location.hash;
        var a = document.querySelector('a[href="' + hash + '"]');
        //si le lien avec cet id existe et que l'onglet correspondant n'est pas déjà actif
        if (a !== null && !a.parentNode.classList.contains('active')) {
            //l'animation d'affichage ne doit pas se produire au chargement de la page sinon le contenu reste masqué
            //mais doit se produire en cas de retour en arrière 
            //=> utilisation de l'évenement pour faire la différence
            afficherOnglet(a, e !== undefined);
        }
    }

    //affichage du bon contenu au changement de hash (donc lorsqu'il y a un retour en arrière)
    // événement donc paramètre e défini dans la fonction
    window.addEventListener('hashchange', hashChange );
    //chargement du bon contenu au chargement de la page pour prendre en compte le hash
    //pas d'évenement donc paramètre e non défini 
    hashChange();
})();