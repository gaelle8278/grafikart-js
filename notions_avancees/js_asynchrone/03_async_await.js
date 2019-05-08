/**
 * Async et Await = dernière évolution en date simplifiant les Promesses
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

// la fonction asynchrone ne retourne pas le résultat directement (ici un tableau d'articles) mais une Promise qui contient le résultat
var getPosts = async function () {
    var response = await get('https://jsonplaceholder.typicode.com/users')
    var users = JSON.parse(response)
    response = await get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id)
    
    var posts = JSON.parse(response)
    return posts
}

// résolution de la Promise (et pas un simple appel de fonction)
getPosts().then(function (posts) {
    console.log('Le premier article ', posts[0])
}).catch(function(err) {
    console.log(err)
}).then(function() {
    //possibilité d'enchainer meme après un catch => fonction exécuté dans tous les cas qu'il y ait erreur ou pas
    console.log('Fin des requetes Ajax')
})


// NB le await ne fonctionne que sur une fonction asynchrone et ne peut être utilisé que dans un contexte asynchrone
//var posts = await getPosts() n'est pas possible car le contexte global n'est pas asynchrone bien que la fonction getPosts() soit asynchrone

//Possibilités de résoudre plusieurs Promises (= exécuter du code une fois que l'ensemble des appels asynchrones est terminé)
var getFristPost = async function() {
    var posts = await getPosts()
    return posts[0]
}

Promise.all([getPosts(), getFristPost()]).then(function (arr) {
    //arr contient les résultats de chaque Promise résolues dans l'ordre d'appel
    console.log(arr[0]) //tous les articles
    console.log(arr[1]) //le prmier article
}).catch(function(err) {

})




