import axios from 'axios'

const http=axios.create({
    baseURL:'http://111.229.20.115:5859'
})

export default http;