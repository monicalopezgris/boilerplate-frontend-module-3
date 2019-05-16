import axios from 'axios';


class CompanyService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api`,
      withCredentials: true,
    });
  }

  get() {
    return this.api.get('/company')
      .then(({ data }) => ({ data }));
  }

  getById(id) {
    return this.api.get(`/company/${id}`)
      .then(({ data }) => ({ data }));
  }

  add(inputData) {
    return this.api.post('/company', inputData)
      .then(({ data }) => data);
  }

  update(id, idUser, inputData) {
    return this.api.put(`/company/${id}/${idUser}`, inputData)
      .then(({ data }) => data);
  }

  delete(id, idUser) {
    return this.api.delete(`/company/${id}/${idUser}`)
      .then(({ data }) => data);
  }
}

const companyService = new CompanyService();

export default companyService;
