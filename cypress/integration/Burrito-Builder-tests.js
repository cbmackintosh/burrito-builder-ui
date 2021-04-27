describe('Burrito Builder', () => {

  describe('error handling and network stubbing' ,() => {

    it('should display an error message if there is a server error', () => {
      cy.intercept({
        method: 'GET',
        url: 'http://localhost:3002/api/v1/orders'
      },
      {
        statusCode: 500
      })
      cy.visit('http://localhost:3000')
      cy.contains('There was a problem retrieving orders')
    })

    it('should display an error message if the use submits the form incorrectly', () => {
      cy.intercept({
        method: 'POST',
        url: 'http://localhost:3002/api/v1/orders'
      },
      {
        statusCode: 404,
        body: {
          id: 10,
          name: 'Cameron',
          ingredients: []
        }
      })
      cy.get('input[name="name"]').type('Cameron')
      cy.get('button').contains('steak').click()
      cy.get('button').contains('beans').click()
      cy.get('button').contains('Submit Order').click()
      cy.get('p').contains('Please enter a name and select at least one ingredient')
    })

  })

  describe('normal site functionality', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('should display the site header on page load', () => {
      cy.get('h1').contains('Burrito Builder')
    })

    it('should display any existing orders on page load', () => {
      cy.get('div[class="order"]').should('exist')
      cy.get('div[class="order"]').contains('Pat')
      cy.get('div[class="order"]').contains('Sam')
      cy.get('div[class="order"]').contains('Alex')
    })

    it('should display an order submission form', () => {
      const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
      possibleIngredients.forEach(ingredient => {
        cy.get('button').contains(ingredient)
      })
      cy.get('input[name="name"]').should('exist')
      cy.get('button').contains('Submit Order').should('exist')
      cy.get('p').contains('Order: Nothing selected').should('exist')
    })

    it('should display a message showing what ingredients have been selected', () => {
      cy.get('button').contains('beans').click()
      cy.get('p').contains('Order: beans')
      cy.get('button').contains('steak').click()
      cy.get('p').contains('Order: beans, steak')
      cy.get('button').contains('carnitas').click()
      cy.get('p').contains('Order: beans, steak, carnitas')
    })

    it('clicking on an ingredient again should remove it from the order list', () => {
      cy.get('button').contains('beans').click()
      cy.get('button').contains('steak').click()
      cy.get('button').contains('carnitas').click()
      cy.get('p').contains('Order: beans, steak, carnitas')
      cy.get('button').contains('beans').click()
      cy.get('p').contains('Order: steak, carnitas')
      cy.get('button').contains('carnitas').click()
      cy.get('p').contains('Order: steak')
      cy.get('button').contains('steak').click()
      cy.get('p').contains('Order: Nothing selected')
    })

    it('submitting a form with no name should produce an error', () => {
      cy.get('button').contains('beans').click()
      cy.get('button').contains('steak').click()
      cy.get('button').contains('Submit Order').click()
      cy.get('p').contains('Please enter a name and select at least one ingredient').should('exist')
    })

    it('submitting a form with no ingredients should produce an error', () => {
      cy.get('input[name="name"]').type('Cameron')
      cy.get('button').contains('Submit Order').click()
      cy.get('p').contains('Please enter a name and select at least one ingredient').should('exist')
    })

    it('submitting a complete form should result in a new order being displayed on the page', () => {
      cy.get('input[name="name"]').type('Cameron')
      cy.get('button').contains('beans').click()
      cy.get('button').contains('steak').click()
      cy.get('button').contains('Submit Order').click()
      cy.get('div[class="order"]').contains('Cameron')
    })
      
  })

})