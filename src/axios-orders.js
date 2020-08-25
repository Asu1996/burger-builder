import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-55460.firebaseio.com/'
});

export default instance;