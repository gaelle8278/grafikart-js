/*
Les callbacks sont utilisées dans les appels Ajax
*/

// Création d'une fonction getPosts qui
//   - récupère le premier utilisateur depuis https://jsonplaceholder.typecode.com/comments?userId={ID}
//   - renvoie les articles au format json

var get = function (url, success, error) {
    var xhr = new window.XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            // console.log("terminé", xhr)
            if(xhr.status === 200) {
                success(xhr.response)
            } else {
                error(xhr)
            }

        }
    }

    xhr.open('GET', url, true)
    xhr.send()
}

var getPosts = function (req_success, req_error) {
    //appel de la fonction get 
    //  avec en second paramètre un callback = fonction qui sera exécutée lorsque la requete ajax sera terminée sans pb
    //  avec en troisième paramètre un callback = = fonction qui sera exécutée lorsque la requete ajax se termine avec des erreurs
    get('http://jsonplaceholder.typicode.com/users', function (response) {
        //console.log(response)
        var users = JSON.parse(response)
        get('https://jsonplaceholder.typicode.com/comments?userId=' + users[0].id, function (response) {
            var posts = JSON.parse(response)
            //console.log(posts)
            req_success(posts)
        }, function (err) {
           req_error('Erreur ajax', err)
        })
    }, function (err) {
       req_error('Erreur ajax', err)
    })
    
}            

getPosts(function (posts) {
    console.log('Le premier article ', posts[0])
}, function (err) {
    console.error(err)
})