import axios from "axios";

axios.defaults.baseURL = 'https://api.musik88.com/api/v1/';

export const getCaraousel = () => {
    return axios.get(`/carousel`)
        .then(res => {
            console.log(res);
            const files = res.data.audio_files;
            return files;
        })
}
