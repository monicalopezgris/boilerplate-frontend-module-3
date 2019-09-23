import React from 'react';
import styled from 'styled-components';
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

const BillSlideItems = ({ data }) => {
  const items = data || null;
  const { subtotal, total } = data;

  if (items) {
    return (
      <Items>
        <Header>Items</Header>
        <table>
          <thead>
            <TableHeader>
              <th>Item</th>
              <th>Units</th>
              <th>Price units</th>
              <th>Price</th>
            </TableHeader>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const {
                item: itemName,
                units,
                priceUnit,
                totalPriceItem
              } = item;
              return (
                <tr key={index}>
                  <Td>{itemName}</Td>
                  <Td>{units}</Td>
                  <Td>{priceUnit}€</Td>
                  <Td>{totalPriceItem}€</Td>
                </tr>
              );
            })}
            <tr>
              <th />
              <th />
              <th>Subtotal</th>
              <th>{subtotal}€</th>
            </tr>
            <tr>
              <th />
              <th />
              <th>Iva</th>
              <th>21%</th>
            </tr>
            <tr>
              <th />
              <th />
              <th>Total</th>
              <th>{total}€</th>
            </tr>
          </tbody>
        </table>
      </Items>
    );


  }
  return <div />;
};

export default ErrorBoundary(BillSlideItems);
