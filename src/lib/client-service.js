import axios from 'axios';


class ClientsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api`,
      withCredentials: true,
    });
  }

  get() {
    return this.api.get('/clients')
      .then(({ data }) => ({ data }));
  }

  getById(id) {
    return this.api.get(`/clients/${id}`)
      .then(({ data }) => ({ data }));
  }

  getByCif(cif) {
    return this.api.get(`/clients/cif/${cif}`)
      .then(({ data }) => ({ data }));
  }

  add(inputData) {
    return this.api.post('/clients', inputData)
      .then(({ data }) => data);
  }

  update(id, inputData) {
    return this.api.put(`/clients/${id}`, inputData)
      .then(({ data }) => data);
  }

  delete(id) {
    return this.api.delete(`/clients/${id}`)
      .then(({ data }) => data);
  }
}

const clientsService = new ClientsService();

export default clientsService;
