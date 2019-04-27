import axios from 'axios';


class DocService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://billydoc.herokuapp.com/api/',
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

  update(id, inputData) {
    console.log('doc-service', inputData)
    return this.api.put(`/doc/${id}`, inputData)
      .then(({ data }) => {
        console.log('saved', data)
        return data; });
  }

  del(id) {
    return this.api.delete(`/doc/${id}`)
      .then(({ data }) => data);
  }
}

const docService = new DocService();

export default docService;
