import axiosInstance from './axios'

const ProductService = {
  setAuthToken() {
    const token = localStorage.getItem('klontong-token')
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  },

  async getAllProducts() {
    this.setAuthToken()
    try {
      const response = await axiosInstance.get('/api/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProduct(id: number) {
    this.setAuthToken()
    try {
      const response = await axiosInstance.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      throw error
    }
  },

  async createProduct(product: any) {
    this.setAuthToken()
    try {
      const response = await axiosInstance.post('/api/products/add', product)
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async updateProduct(id: number, product: any) {
    this.setAuthToken()
    try {
      const response = await axiosInstance.put(`/api/products/update/${id}`, product)
      return response.data
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error)
      throw error
    }
  },

  async deleteProduct(id: number) {
    this.setAuthToken()
    try {
      const response = await axiosInstance.delete(`/api/products/delete/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error)
      throw error
    }
  }
}

export default ProductService
