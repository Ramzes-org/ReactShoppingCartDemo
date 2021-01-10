import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product/Product';
import Spiner from '../../Spinner/index'

class ProductList extends Component {
  componentDidUpdate(props) {
    if (props.isLoading !== this.props.isLoading) {
      setTimeout(() => {
        this.props.loaded()
      }, 200);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        {this.props.isLoading && <Spiner />}
        {this.props.products.map(item => {
          return (
            <Product
              data={item}
              key={item.id}
              addToCart={this.props.addToCart}
            />
          )
        })}
      </React.Fragment>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
}

export default ProductList;