import Axios from "axios";

const ServerUrl = "https://mrmd.xyz"

export const axios = Axios.create({

});

axios.interceptors.request.use(
  
  req => {
    req.url = `${ServerUrl}${req.url}`
    return(req)
  },
  err =>{
    return Promise.reject(err);
  }
)