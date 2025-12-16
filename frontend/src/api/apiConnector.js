import axios from "axios";
export const axiosInstance = axios.create({})
export const apiConnector= (method,url,bodydata,headers,params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodydata?bodydata:null,
        headers:headers,
        params:params?params:null
    })
}