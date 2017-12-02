import {firebase, firestore} from '../../firebase'
import axios from 'axios'
import {Observable} from 'rxjs'
import {addFbPage} from '../actionCreators'

const api_url = "https://graph.facebook.com/v2.10"
var accessToken = "?access_token=EAACxP56GHogBAI6xxF6uPRBa8sbsorY9vnJXcolp0SaSjnyrXzZBqARlcF3HZChQUehcb84IutB7YllO3hUxbwyrXRKxZBm9zsoKXXuy7gFUlurZBkeeoPaZA0DVr4qqnKiYWMeb3ZCC4kudlAZB7GFZABLYDs5FZBgDavGuRaIy8awZDZD"
var uid = "624686658"

var usersRef = firestore.collection('users')

var provider = new firebase.auth.FacebookAuthProvider();

provider.addScope(`
    manage_pages
    pages_messaging
    pages_messaging_subscriptions
    pages_messaging_phone_number
    pages_show_list
    publish_pages
    email
`);

function login(next){
    firebase.auth().signInWithPopup(provider)
        .then(res => {
            let accessToken = res.credential.accessToken
            let providerData = res.user.providerData[0]
            let fire_uid = res.user.uid

            usersRef.doc(fire_uid).set({accessToken, ...providerData, fire_uid})

            next()
        })
        .catch(err => console.log(err))
}

var fb = {
    "pages": function pages(){
        return (dispatch) => {
            axios.get(`${api_url}/${uid}/accounts${accessToken}`)
                .then(pages => {
                    pages.data.data.map(page => {
                        axios.get(`${api_url}/${page.id}${accessToken}`, {params: {fields: "picture"}})
                            .then(picture => {
                                dispatch(addFbPage({...picture.data, ...page}))
                            })
                    })
                })
        }
    }
}

export { login, fb }
