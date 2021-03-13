import axios from 'axios';

const apiTATU = axios.create({
  baseURL: 'https://projetotatu.com.br/sga/api/v1',
});

export default apiTATU;