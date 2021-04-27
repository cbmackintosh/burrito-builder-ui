import React, { Component } from 'react';

class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    this.props.placeOrder(newOrder)
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleIngredientChange = (e) => {
    e.preventDefault()
    let selectedIngredients = this.state.ingredients
    if (!selectedIngredients.includes(e.target.name)) {
      selectedIngredients.push(e.target.name)
    } else {
      selectedIngredients.splice(selectedIngredients.indexOf(e.target.name), 1)
    }
    this.setState({ ingredients: selectedIngredients })
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
