import React, { Component } from 'react';
import './App.css';
import { getOrders, placeOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => this.setState({ error: 'There was a problem retrieving orders' }));
  }

  submitNewOrder = (newOrder) => {
    placeOrder(newOrder)
    .then(result => {
      if (result.name && result.ingredients.length) {
        this.setState({ orders: [...this.state.orders, result], error: '' })
      } else {
        this.setState({ error: 'Please enter a name and select at least one ingredient' })
      }
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm placeOrder={this.submitNewOrder} />
          {this.state.error && <p className='error-message'>{this.state.error}</p>}
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
