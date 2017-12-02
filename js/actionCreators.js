import { firestore } from '../firebase'
var usersRef = firestore.collection("users")
var pagesRef = firestore.collection("pages")
var automationsRef = firestore.collection("users/3j5UTx1lflT0FNB3Cf0h8OL19wd2/automations")

import {
    ADD_ACTION,
    TRIGGER_SELECTED,
    UPDATE_ELEMENT,
    SAVE_TO_FIREBASE,
    GET_USER,
    POPULATE_AUTOMATIONS,
    UPDATE_NAME,
    UPDATE_ACTIVE_AUTOMATION,
    DELETE_AUTOMATION,
    ADD_NEW_AUTOMATION,
    UPDATE_FIREBASE_AUTOMATION,
    ADD_FB_PAGE,
    CONNECT_FB_PAGE
} from './actions'

export function addAction(action){
    return { type: ADD_ACTION, payload: action}
}

export function triggerSelected(trigger){
    return { type: TRIGGER_SELECTED, payload: trigger }
}

export function updateElement(payload){
    return { type: UPDATE_ELEMENT, payload }
}

export function saveToFirebase(payload){
    return { type: SAVE_TO_FIREBASE, payload }
}

export function updateFirebaseAutomation(payload){
    return { type: UPDATE_FIREBASE_AUTOMATION, payload}
}

export function getUser(payload){
    return { type: GET_USER, payload }
}

export function getUserFromFirebase(fire_uid){
    return (dispatch) => {
        usersRef.doc(fire_uid).get().then(doc => {
            dispatch(getUser(doc.data()))
        })
    }
}

export function populateAutomationsList(data){
    return { type: POPULATE_AUTOMATIONS, payload: data }
}

export function getAllAutomationsFromFirebase(fb_page_id){
    return (dispatch) => {
        firestore.collection(`pages/${fb_page_id}/automations`)
            .onSnapshot(snap => {
                snap.forEach(doc => dispatch(populateAutomationsList({[doc.id]: doc.data()})))
            })
    }
}

export function updateName(data){
    return { type: UPDATE_NAME, payload: data}
}

export function updateActiveAutomation(data){
    return { type: UPDATE_ACTIVE_AUTOMATION, payload: data}
}

export function getAutomationFromFirebase(fb_page_id, active_automation_id){
    return (dispatch) => {
        pagesRef
            .doc(`${fb_page_id}/automations/${active_automation_id}`).get()
                .then(doc => {
                    if (doc.exists) dispatch(updateActiveAutomation({active_automation_id, ...doc.data()}))
                })
    }
}

export function deleteAutomation(fb_page_id, active_automation_id){
    pagesRef.doc(`${fb_page_id}/automations/${active_automation_id}`).delete()
    return {type: DELETE_AUTOMATION, payload: active_automation_id}
}

export function addNewAutomation(){
    return {type: ADD_NEW_AUTOMATION}
}

export function addFbPage(payload){
    return {type: ADD_FB_PAGE, payload}
}

export function connectFbPage(payload){
    let { id, accessToken, fire_uid, name, picture } = payload;
    let data = {id, accessToken, fire_uid, name, picture}
    pagesRef.doc(id).set(data)
    return {type: CONNECT_FB_PAGE, payload}
}
