import axios from "axios";
import Firebase from "../components/Firebase";

axios.defaults.baseURL = 'https://api.musik88.com/api/v1/';

export const getHome = (path: string, firebase: Firebase) => {
    return Promise.all([
        firebase.whoAmIRef().once('value'),
        axios.get(`/carousel`),
    ]).then((values) => {
        const whoAmI = values[0].val();
        const files = values[1].data.audio_files;
        const obj = {
            path: path,
            data: {
                whoAmI: whoAmI,
                carousel: files
            }
        };
        return obj;
    });
}

export const getAbout = (path: string, firebase: Firebase) => {
    return firebase
        .aboutRef()
        .once('value')
        .then((snapshot) => {
        return {
            path: path,
            data: snapshot.val()
        }
    });
}

export const getContact = (path: string, firebase: Firebase) => {
    return firebase
        .contactRef()
        .once('value')
        .then((snapshot) => {
        return {
            path: path,
            data: snapshot.val()
        }
    });
}