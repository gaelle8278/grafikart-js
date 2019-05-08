/**
 * Fetch est une nouvelle API qui vient remplacer XMLHttpRequest avec un support natif des Promesses.
 * https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
 */

//  fetch('https://jsonplaceholder.typicode.com/users').then(function (response) {
//      return response.json()
//  }).then (function (data) {
//      console.log(data)
//  })

// convertit dans une fonction pour simplifier l'appel

const getUsers = async function () {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        //let response = await fetch('http//127.0.0.1:5500/')
        if(response.ok) {
            let data = await response.json()
            console.log(data)
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(e) {
        console.log(e)
    }    
}


const insertPost = async function (data) {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let responseData = await response.json()
    console.log(responseData)
}
// possibilité d'utiliser un objet Request pour envoyer la requete plutot que l'url et l'objet de configuration des paramètres
// la requete est dans un objet indépendant => meilleure construction du code
// const insertPost = async function (data) {
//     let request = new Request('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     let response = await fetch(request)
//     let responseData = await response.json()
//     console.log(responseData)
// }

getUsers()

insertPost({
    name: 'Jean',
    age: 29
})