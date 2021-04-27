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
      .catch(err => console.error('Error fetching:', err));
  }

  submitNewOrder = (newOrder) => {
    placeOrder(newOrder)
    .then(result => {
      if (result.id) {
        this.setState({ orders: [...this.state.orders, result], error: ''})
      } else {
        this.setState({ error: 'Please enter a name and select at least one ingredient' })
      }
    })
  }

  render() {
    console.log(this.state)
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
