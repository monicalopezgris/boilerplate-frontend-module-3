import axios from 'axios';


class DocService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true,
    });
  }

  get() {
    return this.api.get('/doc')
      .then(({ data }) => data);
  }

  add(inputData) {
    return this.api.post('/doc', inputData)
      .then(({ data }) => data);
  }

  update(id) {
    return this.api.put(`/doc/${id}`)
      .then(({ data }) => data);
  }

  del(id) {
    return this.api.delete(`/doc/${id}`)
      .then(({ data }) => data);
  }
}

const docService = new DocService();

export default docService;
