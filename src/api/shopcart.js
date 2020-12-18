import axios from 'axios'

export const fetchCart = async () => {
    const res = await axios.get('http://localhost:3030/api/cart')
    return res.data
}

export const checkQuantity = async (product) => {
    const res = await axios.post('http://localhost:3030/api/product/check', product)
    return res
}