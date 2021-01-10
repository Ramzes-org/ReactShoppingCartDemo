import React from 'react';
import SelfHeader from './SelfHeader/SelfHeader';
import ProductList from './ProductList/ProductList';

import './style.scss';

const Self = props => {
  return (
    <div className="shelf-container">
      <SelfHeader
        handleChange={props.handleChange}
        sort={props.sort}
        foundQuantity={props.products.length}
      />
      <ProductList
        products={props.products}
        loaded={props.loaded}
        isLoading={props.isLoading}
        addToCart={props.addToCart}
      />
    </div>
  );
}



export default Self;