import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../../../Thumbnail/Thumbnail';

import formatPrice from '../../../../services/formatPrice';

class Product extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data;
    const formatedPrice = formatPrice(data.price);
    const installment = inst => {
      if (inst) {
        return (
          <div className="installment">
            <span>or {data.installments} &times;</span>
            <b>
              {this.props.currencyFormat}
              {(formatedPrice / data.installments).toFixed(2)}
            </b>
          </div>
        )
      }
    }

    return (
      <div className="shelf-item">
        {data.isFreeShipping &&
          <div className="shelf-stopper">Free shipping</div>
        }
        <Thumbnail
          alt={data.title}
          classNames="shelf-item__thumb"
          src={require(`../../../../static/products/${data.sku}_1.jpg`)}
        />
        <p className="shelf-item__title">{data.title}</p>
        <div className="shelf-item__price">
          <div className="val">
            <small>{data.currencyFormat}</small>
            <b>{formatedPrice.slice(0, formatedPrice.length - 3)}</b>
            <span>{formatedPrice.slice(formatedPrice.length - 3)}</span>
          </div>
          {installment(data.installments)}
        </div>
        <div
          className="shelf-item__buy-btn"
          onClick={()=> this.props.addToCart(data)}
        >
          Add to cart
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  data: PropTypes.object.isRequired,
  addToCart: PropTypes.func,
}

export default Product;