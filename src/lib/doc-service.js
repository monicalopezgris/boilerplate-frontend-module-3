import axios from 'axios';

class DocService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api`,
      withCredentials: true,
    });
  }

  get() {
    return this.api.get('/doc')
      .then(({ data }) => ({ data }))
      .catch((error) => {
        return error;
      });
  }

  getById(id) {
    return this.api.get(`/doc/${id}`)
      .then(({ data }) => ({ data }))
      .catch((error) => {
        throw new Error('I crashed!');
      });
  }

  add(inputData) {
    return this.api.post('/doc', inputData)
      .then(({ data }) => data);
  }

  update(id, inputData) {
    return this.api.put(`/doc/${id}`, inputData)
      .then(({ data }) => data);
  }

  delete(id) {
    return this.api.delete(`/doc/${id}`)
      .then(({ data }) => data);
  }
}

const docService = new DocService();

export default docService;
