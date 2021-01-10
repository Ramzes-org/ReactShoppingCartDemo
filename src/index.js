import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Filter from "./components/Filter/Filter";
import Self from "./components/Self/index";
import FloatCart from "./components/FloatCart/FloatCart";

import getSharedElements from "./services/util";
import './index.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      products: [],
      cart: [],
      isLoading: true,
      isOpenCart: false,
      filter: {
        selectedSizes: [],
        order: 'select',
      },
    }
    this.toggleSelectedSize = this.toggleSelectedSize.bind(this);
    this.handleChange = this.sortProducts.bind(this);
    this.handleClickCart = this.handleClickCart.bind(this);
    this.getSharedElements = getSharedElements.bind(this);
    this.loaded = this.loaded.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeProductQuantity = this.changeProductQuantity.bind(this);
  }

  // Fetch Initial Set of Products from external API
  getProducts() {
    let url = "http://my-json-server.typicode.com/Ramzes-org/FackeJson/db";
    axios.get(url).then(response => {
      this.setState({
        data: [...response.data.products],
        products: [...response.data.products],
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  // filter by Sizes
  toggleSelectedSize(e) {
    let sizes = this.state.filter.selectedSizes;
    let isChecedSize = sizes.some(item => item === e.target.value);

    if (!isChecedSize) { // add new size
      sizes.push(e.target.value);
    } else {
      let index = sizes.findIndex(item => item === e.target.value);
      sizes.splice(index, 1);
    }
    this.setState(state => ({ filter: { ...this.state.filter, selectedSizes: sizes }, isLoading: true }),
    () => this.filterBySize()
    )
  }

  filterBySize() {
    const filter = this.state.filter.selectedSizes;
    let products = this.state.data.filter(item => { 
      if(!filter.length) return item;
      return this.getSharedElements(filter, item.availableSizes).length;
    })
    this.setState({products: products});
  }

  // sort by price. Change state "filter.order: []" -- when we change input "Order by"
  // and then we call callback function sortOrder() when state was updated
  sortProducts(e) {
    e.persist();
    this.setState(state => ({ filter: { ...this.state.filter, order: e.target.value }, isLoading: true }), 
      () => this.sortOrder()
    )
  }

  // callback sort by price "sortProducts(e)"
  sortOrder() {
    let prod = this.state.products;
    let orderBy = this.state.filter.order;
    switch(orderBy) {
      case 'lowest': 
        prod = prod.sort((a, b) => a.price - b.price);
        break;
      case 'highest': 
        prod = prod.sort((a, b) => b.price - a.price);
        break;
      default: 
        prod = this.state.data;
        this.filterBySize()
        return;
    }
    this.setState({products: prod})
  }

  loaded() {
    this.setState({isLoading: false})
  }

  handleClickCart() {
    this.setState({isOpenCart: !this.state.isOpenCart})
  }

  addToCart (data) {
    let cart = this.state.cart;
    const isCart = cart.some(item => item.id === data.id );
    if (!isCart) {
      data.quantity = 1;
      cart.push(data);
    } else {
      cart = cart.map((item) => {
        if (item.id === data.id) {
          item.quantity += 1;
        }
        return item;
      })
    }
    this.setState({cart: cart, isOpenCart: true});
  }

  removeFromCart(id) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
  }

  changeProductQuantity(id, isIncrement) {
    let cart = this.state.cart;
    cart = cart.map((item) => {
      if (item.id === id) {
        isIncrement ? item.quantity += 1: item.quantity -= 1;
      }
      return item;
    })
    this.setState({cart: cart});
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Filter
            toggleFilter={this.toggleSelectedSize}
          />
          <Self
            products={this.state.products}
            loaded={this.loaded}
            isLoading={this.state.isLoading}
            handleChange={this.handleChange}
            sort={this.state.filter.order}
            addToCart={this.addToCart}
          />
        </main>
        <FloatCart 
          cart={this.state.cart}
          isOpenCart={this.state.isOpenCart}
          handleClickCart={this.handleClickCart}
          removeFromCart={this.removeFromCart}
          changeProductQuantity={this.changeProductQuantity}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

