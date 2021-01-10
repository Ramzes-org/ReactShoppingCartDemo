import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartProduct from './CartProduct/CartProduct';
import EmptyCart from '../empty-states/EmptyCart';

import formatPrice from '../../services/formatPrice';
import './style.scss';

class FloatCart extends Component {
  subtotal() {
    const formatedPrice = formatPrice;
    const subtotal = {
      price: 0,
      installments: 0,
      discount: 0,
      currencyFormat: '$'
    };
    this.props.cart.forEach(item => {
      subtotal.price += item.price * item.quantity;
      if(subtotal.installments < item.installments) {
        subtotal.installments = item.installments;
        subtotal.currencyFormat = item.currencyFormat;
      }
    });
    if (subtotal.price != 0 && subtotal.installments != 0 ) {
      subtotal.discount = subtotal.price / subtotal.installments;
    }
    subtotal.price = formatedPrice(subtotal.price);
    subtotal.discount = formatedPrice(subtotal.discount);
    return subtotal;
  }

  render() {
    const subtotal = this.subtotal();
    const isOpen = this.props.isOpenCart;

    return (
        <div className={isOpen ? "float-cart float-cart--open" : "float-cart"}>
          {isOpen ? (
            <div 
              className="float-cart__close-btn"
              onClick={this.props.handleClickCart}
            >X</div>
          ):
          (<span 
            className="bag bag--float-cart-closed"
            onClick={this.props.handleClickCart}
            >
              <span className="bag__quantity">{this.props.cart.length}</span>
            </span>
          )}
          
          <div className="float-cart__content">
            <div className="float-cart__header">
              <span className="bag">
                <span className="bag__quantity">
                  {this.props.cart.length}
                </span>
              </span>
              <span className="header-title">Cart</span>
            </div>

            <div className="float-cart__shelf-container">
              {this.props.cart.length <= 0 && <EmptyCart />}
              {this.props.cart.map(item => (
                <CartProduct 
                  data={item}
                  key={item.id}
                  removeFromCart={this.props.removeFromCart}
                  changeProductQuantity={this.props.changeProductQuantity}
                />
              ))}
            </div>

            <div className="float-cart__footer">
              <div className="sub">SUBTOTAL</div>
              <div className="sub-price">
                <p className="sub-price__val">
                  {`${subtotal.currencyFormat} ${subtotal.price}`}
                </p>
                <small className="sub-price__installment">
                  {subtotal.installments > 0 && 
                    <span>
                      {`OR UP TO ${subtotal.installments} x ${subtotal.currencyFormat} ${subtotal.discount}`}
                    </span>
                  }
                </small>
              </div>
              <div 
                className="buy-btn"
                onClick={() => alert(`Checkout - Subtotal: ${subtotal.currencyFormat} ${subtotal.price}`)}
              >
                Checkout
              </div>
            </div>
          </div>

        </div>    
    )
  }
}

FloatCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpenCart: PropTypes.bool.isRequired,
  handleClickCart: PropTypes.func.isRequired,
}

export default FloatCart;
