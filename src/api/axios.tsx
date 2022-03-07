import Axios from "axios";

// const ServerUrl = "https://mrmd.xyz"

export const axios = Axios.create({

});

axios.interceptors.request.use(
    (req: any) => {
        return (req)
    },
    (err: any) => {
        return Promise.reject(err);
    }
)