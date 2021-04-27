export const getOrders = () => {
  return fetch('http://localhost:3002/api/v1/orders')
      .then(response => response.json())
}