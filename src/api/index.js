import axios from "axios";
import { store } from "../store";

const Axios=()=>axios.create({
    baseURL:'https://iuweddingapi.azurewebsites.net/api/',
    headers:{
        Authorization: "Bearer "+ store.getState().Auth.userToken
    }
});

export default Axios;