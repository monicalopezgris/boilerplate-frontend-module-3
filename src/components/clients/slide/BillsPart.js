import React, { Component } from 'react';
import styled from 'styled-components';
import doc from '../../../lib/doc-service';
import ErrorBoundary from '../../../lib/ErrorBoundary';

const Items = styled.div`
  margin-top:3rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
  `;
const Td = styled.td`
  text-align:center;
  `;
const Header = styled.h3`
  font-weight:bold;
  text-transform: uppercase;
  color:${props => props.theme.color.primaryColor};
`;

const TableHeader = styled.tr`
  // font-weight:bold;
  // text-transform: uppercase;
  background-color:${props => props.theme.color.primaryColor};
`;
class BillSlideItems extends Component {
  state = {
    bills: [],
  }

  componentDidMount() {
    this.getBills();
  }

  getBills = async () => {
    try {
      const bills = await doc.getByClient('B23232323');
      this.setState({ bills: bills.data });
    } catch (e) {
      throw new Error('¡Whooops!');
    }
  }

  render() {
    const { bills } = this.state;
    if (bills.length > 0) {
      return (
        <Items>
          <Header>Bills</Header>
          <table>
            <thead>
              <TableHeader>
                <th>Ref</th>
                <th>Status</th>
                <th>Last update</th>
              </TableHeader>
            </thead>
            <tbody>
              {bills.map((bill, index) => {
                const {
                  ref,
                  status,
                  updatedAt,
                } = bill;
                return (
                  <tr key={index}>
                    <Td>{ref}</Td>
                    <Td>{status}</Td>
                    <Td>{updatedAt}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Items>
      );
    }
    return (
      <p>aa</p>
    );
  }
}

export default ErrorBoundary(BillSlideItems);
