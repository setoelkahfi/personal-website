import axios from "axios";
import Firebase from "../components/Firebase";

axios.defaults.baseURL = 'https://api.musik88.com/api/v1/';

export const getCaraousel = () => {
    return axios.get(`/carousel`)
        .then(res => {
            console.log(res);
            const files = res.data.audio_files;
            const obj = {
                path: '/',
                data: files
            };
            return obj;
        })
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