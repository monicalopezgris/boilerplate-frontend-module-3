import React from 'react';
import { Link } from 'react-router-dom';
import BillList from '../components/BillList';

const Dash = () => (
  <>
    <BillList />
    <Link to="/bill"><button type="button">Add</button></Link>
  </>
);
export default Dash;
