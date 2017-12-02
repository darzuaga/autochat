import Guid from 'guid'
import { firestore } from '../firebase'
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

var automationsRef = firestore.collection("users/3j5UTx1lflT0FNB3Cf0h8OL19wd2/automations")
var pagesRef = firestore.collection("pages")

const DEFAULT_STATE = {
    active_automation_id: "",
    name: "",
    action_elements: [],
    event_elements: [],
    user: {},
    automations: [],
    pages: [],
    active_fb_page: {}
}

const triggerSelected = (state, action) => {
    var id = Guid.raw();
    return {...state, event_elements: [...state.event_elements, {id, name: "KEYWORD", text: ""}]}
}

const addAction = (state, action) => {
    var id = Guid.raw();
    return {...state, action_elements: [...state.action_elements, {id, name: action.payload, text: ""}]}
}

const saveToFirebase = (state, action) => {
    let {event_elements, action_elements, name} = state;
    let payload = { event_elements, action_elements, name }

    firestore.collection(`pages/${state.active_fb_page.id}/automations`)
        .add(payload)
        .then((docRef) => console.log("Document written with ID: ", docRef.id))
        .catch((error) => console.error("Error adding document: ", error));

    return {...state, action_elements: [], event_elements: []}
}

const updateFirebaseAutomation = (state, action) => {
    let {event_elements, action_elements, name, active_automation_id} = state;
    let payload = { event_elements, action_elements, name }
    firestore.collection(`pages/${state.active_fb_page.id}/automations`)
        .doc(active_automation_id)
        .update(payload)

    return {...state}
}

const updateActiveAutomation = (state, action) => {
    return {...state, ...action.payload}
}

const updateElement = (state, action) => {
    var events = state[action.payload.event_type]
        .map((event) => event.id == action.payload.id ? action.payload : event)

    return {...state, [action.payload.event_type]: events}
}

const getUser = (state, action) => {
    return {...state, user: action.payload}
}

const populateAutomationsList = (state, action) => {
    return {...state, automations: {...state.automations, ...action.payload}}
}

const updateName = (state, action) => {
    return {...state, name: action.payload}
}

const deleteAutomation = (state, action) => {
    let automations = _.omit(state.automations, action.payload)
    return {...state, automations}
}

const addNewAutomation = (state, action) => {
    return {...state, action_elements: [], event_elements: [], name: "", active_automation_id: ""}
}

const addFbPage = (state, action) => {
    return {...state, pages: [...state.pages, action.payload]}
}

const connectFbPage = (state, action) => {
    return {...state, active_fb_page: action.payload}
}

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case ADD_ACTION:
            return addAction(state, action)
        case TRIGGER_SELECTED:
            return triggerSelected(state, action)
        case UPDATE_ELEMENT:
            return updateElement(state, action)
        case SAVE_TO_FIREBASE:
            return saveToFirebase(state, action)
        case GET_USER:
            return getUser(state, action)
        case POPULATE_AUTOMATIONS:
            return populateAutomationsList(state, action)
        case UPDATE_NAME:
            return updateName(state, action)
        case DELETE_AUTOMATION:
            return deleteAutomation(state, action)
        case UPDATE_FIREBASE_AUTOMATION:
            return updateFirebaseAutomation(state, action)
        case UPDATE_ACTIVE_AUTOMATION:
            return updateActiveAutomation(state, action)
        case ADD_NEW_AUTOMATION:
            return addNewAutomation(state, action)
        case ADD_FB_PAGE:
            return addFbPage(state, action)
        case CONNECT_FB_PAGE:
            return connectFbPage(state, action)
        default:
            return state
    }
}

export default rootReducer;
