import React from 'react';
import styled from 'styled-components';
import List from '../components/bill/List';
import ClientList from '../components/clients/ClientList';
// import CompanyList from '../components/company/CompanyList';


const MainList = styled.div`
  height: 100%;
  flex:2;
  margin:1rem;
`;
const AuxList = styled.div`
  height: 100%;
  flex:1;
  margin:1rem;
`;

const Dash = () => (
  <>
    <MainList>
      <List />
    </MainList>
    <AuxList>
      <ClientList />
      {/* <CompanyList /> */}
    </AuxList>
  </>
);
export default Dash;
