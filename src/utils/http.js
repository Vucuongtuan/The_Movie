import axios from 'axios';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://ophim1.com',
    });
  }
}

const http = new Http().instance;
export default http;
