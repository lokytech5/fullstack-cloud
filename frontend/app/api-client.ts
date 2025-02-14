import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://dostech.solutions/api'
})

export { apiClient }