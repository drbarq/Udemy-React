import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerbuilder-e0733.firebaseio.com/'
})

export default instance