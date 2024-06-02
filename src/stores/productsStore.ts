import { ref } from 'vue'
import { defineStore } from 'pinia'

import ProductService from '@/api/productService'
import type { ProductType } from '@/types/ProductType'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductType[]>([])

  const getAllProducts = async () => {
    try {
      const result = await ProductService.getAllProducts()
      products.value = result
      return result
    } catch (error) {
      throw error
    }
  }

  const deleteProductById = async (productId: number) => {
    try {
      const result = await ProductService.deleteProduct(productId)
      await getAllProducts()
      return result
    } catch (error) {
      throw error
    }
  }

  const createProduct = async (product: ProductType) => {
    try {
      const result = await ProductService.createProduct(product)
      await getAllProducts()
      return result
    } catch (error) {
      throw error
    }
  }

  const updateProduct = async (product: ProductType) => {
    try {
      const result = await ProductService.updateProduct(product.id, product)
      await getAllProducts()
      return result
    } catch (error) {
      throw error
    }
  }

  return { products, getAllProducts, createProduct, updateProduct, deleteProductById }
})
