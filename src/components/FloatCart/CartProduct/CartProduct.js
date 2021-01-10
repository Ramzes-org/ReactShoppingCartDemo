import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../../Thumbnail/Thumbnail'
import formatPrice from '../../../services/formatPrice';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    }
  }

  handleMouseOver() {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut() {
    this.setState({ isMouseOver: false });
  };

  render() {
    const data = this.props.data;
    const formatedPrice = formatPrice(data.price);
    const classes = ['shelf-item'];

    if(!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={this.props.removeFromCart.bind(this, data.id)}
        />
        <Thumbnail
          classNames="shelf-item__thumb"
          alt={data.title}
          src={require(`../../../static/products/${data.sku}_2.jpg`)}
        />
        <div className="shelf-item__details">
          <p className="title">{data.title}</p>
          <p className="desc">
            {`${data.availableSizes[0]} | ${data.style}`} <br />
            {`Quantity: ${data.quantity}`}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>
            {`${data.currencyFormat} ${formatedPrice}`}
          </p>
          <div>
            <button
              className="change-product-button"
              disabled={data.quantity == 1}
              onClick={() => this.props.changeProductQuantity(data.id, false)}
            >
              -
            </button>
            <button
              className="change-product-button"
              onClick={() => this.props.changeProductQuantity(data.id, true)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

CartProduct.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  changeProductQuantity: PropTypes.func.isRequired,
}

export default CartProduct;

