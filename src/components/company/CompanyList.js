import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withAuth } from '../../lib/AuthProvider';
import companyService from '../../lib/company-service';
import CompanyListItem from './CompanyListItem';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.color.secondaryColor};
`;

class CompanyList extends Component {
  state = {
    company: [],
  }

  async componentDidMount() {
    const company = await companyService.get();
    this.setState({ company: company.data });
  }

  onDelete = (id) => {
    companyService.delete(id);
  }

  render() {
    const { company } = this.state;
    return (
      <Wrapper>
        <Link to="/company/new"><button type="button">Add</button></Link>
        {
          company.map((item) => {
            const { _id: id, name } = item;
            return <CompanyListItem key={id} itemData={{ id, name }} onDelete={this.onDelete} />;
          })
        }
      </Wrapper>
    );
  }
}

export default withAuth(CompanyList);
