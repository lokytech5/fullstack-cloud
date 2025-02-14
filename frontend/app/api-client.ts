import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://fullstack.dostech.solutions/api'
})

export { apiClient }