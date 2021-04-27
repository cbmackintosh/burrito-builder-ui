export const getOrders = () => {
  return fetch('http://localhost:3002/api/v1/orders')
      .then(response => response.json())
}

export const placeOrder = (newOrder) => {
  return fetch('http://localhost:3002/api/v1/orders', {
    method: 'POST',
    headers: {
      "Content-Type": "application/jsoon"
    },
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json())
}