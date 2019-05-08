/**
 * Les promises permettent de rendre les enchainements de callbacks plus lisibles
 * 
 * A partir de ES6 (ECMAScript 2015)
 * 
 * Polyfill pour les anciens navigateurs : l'objet Promise => https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
 */

var get = function (url) {
    return new Promise(function(resolve, reject) {
        var xhr = new window.XMLHttpRequest()

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                // console.log("terminé", xhr)
                if(xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr)
                }
            }
        }
        xhr.open('GET', url, true)
        xhr.send()
    })
}

// // Exemple fonctionement de base : then > resolve, catch => reject
// get('https://jsonplaceholder.typicode.com/users').then(function (response) {
//     console.log(response)
// }).catch(function (error) {
//     console.log(error)
// })

// Ex 1 : Fonction getPosts utilisant get qui utilise une Promise
var getPosts = function (req_success, req_error) {
    get('https://jsonplaceholder.typicode.com/users').then( function (response) {
        var users = JSON.parse(response)
        get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id).then( function (response) {
            var posts = JSON.parse(response)
            //console.log(posts)
            req_success(posts)
        }).catch(function (error) {
            req_error('Erreur Ajax' + error)
        })
    }).catch(function (error) {
        req_error('Erreur Ajax' + error)
    })
          
}           

getPosts(function (posts) {
    console.log('Le premier article ', posts[0])
}, function (err) {
    console.error(err)
})

// Ex 2 : Fonction getPosts2 utilisant une Promise et utilisant get qui utilise une Promise
// var getPosts2 = function () {
//     return new Promise(function (resolve, reject) {
//         get('https://jsonplaceholder.typicode.com/users').then( function (response) {
//             var users = JSON.parse(response)
//             get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id).then( function (response) {
//                 var posts = JSON.parse(response)
//                 resolve(posts)
//             }).catch(function (error) {
//                 reject('Erreur Ajax' + error)
//             })
//         }).catch(function (error) {
//             reject('Erreur Ajax' + error)
//         })
//     })
// }  

//=> écriture simplifiée = enchainement des appels Promises :
// var getPosts2 = function () {
//     return new Promise(function (resolve, reject) {
//         get('https://jsonplaceholder.typicode.com/users').then( function (response) {
//             var users = JSON.parse(response)
//             //le then du premier appel get retourne une Promise donc possibilité d'enchainer un then dessus
//             return get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id)
//         }).then( function (response) {
//             var posts = JSON.parse(response)
//             resolve(posts)
//         }).catch(function (error) {
//                 reject('Erreur Ajax' + error)
//         })
       
//     })
// } 

// => ecriture simplifiée finale
var getPosts2 = function () {
    return get('https://jsonplaceholder.typicode.com/users').then( function (response) {
        var users = JSON.parse(response)
        return get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id)
    }).then( function (response) {
        var posts = JSON.parse(response)
        return posts
    })
       
    
}

getPosts2().then(function(posts) {
    console.log(posts[0])
}).catch(function(err) {
    //catch sur l'objet parent et non sur chaque appel = la capture du reject est propagé jusqu'à l'élément appelant et non capté a chaquee appel
    console.log(err)
}).then(function() {
    //possibilité d'enchainer meme après un catch => fonction exécuté dans tous les cas qu'il y ait erreur ou pas
    console.log('Fin des requetes Ajax')
})

/**
 * Promesses 
 * let p = new Promise(function (resolve, reject) {
 * ...
 * ...
 * resolve(...)
 * })
 * 
 * p.then(function (response) { .... })
 * .then(function() { })
 * .then(function() { })
 * .catch(function (error) {...})
 */





