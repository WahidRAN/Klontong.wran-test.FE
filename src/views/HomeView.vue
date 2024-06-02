<template>
  <div class="flex flex-col">
    <header class="sticky top-0 bg-blue-500 p-5 text-2xl text-gray-100">
      <h1 class="container mx-auto">Klontong App</h1>
    </header>
    <main class="grow">
      <h2 class="text-center text-2xl sm:text-4xl font-semibold mt-2">Daftar produk</h2>
      <section class="mb-3 p-2 sticky top-[72px] bg-white/10 backdrop-blur">
        <div class="flex w-full gap-4">
          <input
            type="text"
            placeholder="Cari produk"
            class="border rounded-md focus:outline-none px-3 grow"
            v-model="searchProduct"
          />
          <button
            class="bg-sky-700 py-1 px-3 rounded-md text-gray-100"
            @click="handleAddNewProduct"
          >
            Tambah Produk
          </button>
        </div>
      </section>
      <div class="container m-4 mx-auto">
        <ProductTable v-if="isDesktop" :data="paginatedProducts" />
        <div v-else class="container flex flex-col gap-4">
          <section
            v-for="product in paginatedProducts"
            :key="product.id"
            class="shadow-lg p-2 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-2 border rounded-xl"
          >
            <div class="flex gap-2 items-start sm:grow">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                :alt="product.name"
                class="aspect-square w-20 sm:w-40 rounded-lg"
              />
              <div class="flex flex-col w-full sm:h-full">
                <section class="flex justify-between items-center">
                  <h3 class="text-lg sm:text-2xl font-semibold">{{ product.name }}</h3>
                  <span class="hidden min-[424px]:block text-xs text-gray-500"
                    >SKU: {{ product.sku }}</span
                  >
                </section>
                <h4 class="mb-2 text-xs text-gray-500">{{ product.category_name }}</h4>
                <h4 class="hidden sm:block sm:grow">{{ product.description }}</h4>
                <p class="text-green-700 sm:text-2xl">Rp. {{ product.harga }}</p>
              </div>
            </div>
            <div class="flex sm:flex-col sm:min-w-40 gap-2">
              <button
                class="w-1/2 sm:w-full bg-sky-700 py-1 rounded-md text-gray-100"
                @click="handleEditProduct(product)"
              >
                Edit Produk
              </button>
              <button
                class="w-1/2 sm:w-full bg-red-600 py-1 rounded-md text-gray-50"
                @click="handleDeleteProduct(product.id)"
              >
                Hapus
              </button>
            </div>
          </section>
        </div>

        <!-- <div class="flex justify-between items-center mt-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
  
          <div class="flex space-x-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="setPage(page)"
              :class="[
                'px-4 py-2 rounded',
                {
                  'bg-blue-500 text-white': page === currentPage,
                  'bg-gray-200': page !== currentPage
                }
              ]"
            >
              {{ page }}
            </button>
          </div>
  
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div> -->
      </div>
    </main>
    <Modal v-model:modelValue="showProductForm">
      <form @submit.prevent="submitProductForm" class="space-y-4 container">
        <section class="flex gap-2">
          <div class="w-1/3 sm:w-1/4">
            <label for="category_id" class="block text-sm font-medium text-gray-700"
              >Category ID</label
            >
            <input
              v-model="productForm.category_id"
              type="number"
              id="category_id"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div class="grow">
            <label for="category_name" class="block text-sm font-medium text-gray-700"
              >Category Name</label
            >
            <input
              v-model="productForm.category_name"
              type="text"
              id="category_name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </section>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="productForm.name"
            type="text"
            id="name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            v-model="productForm.description"
            id="description"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>
        <section class="flex gap-2">
          <div class="grow">
            <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
            <input
              v-model="productForm.sku"
              type="text"
              id="sku"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div class="w-1/3">
            <label for="harga" class="block text-sm font-medium text-gray-700">Harga</label>
            <input
              v-model="productForm.harga"
              type="number"
              id="harga"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </section>
        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600"
          >
            {{ isNewProduct ? 'Tambahkan Produk Baru' : 'Update Produk' }}
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, reactive } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
// Store
import { useProductsStore } from '@/stores/productsStore'
// Component
import ProductTable from '@/components/ProductTable.vue'
import Modal from '@/components/Modal.vue'
import type { ProductType } from '@/types/ProductType'

// Responsive module: START
const debounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(func, delay)
  }
}
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = ref(breakpoints.isGreater('md'))
const handleResize = () => {
  isDesktop.value = breakpoints.isGreater('md')
}

const resizeListener = debounce(handleResize, 100)
// Responsive module: END

// Product CRUD module: START
const handleDeleteProduct = async (productId: number) => {
  await productsStore.deleteProductById(productId)
}
// Product CRUD module: END

// Vue Lifecycle module: START
onMounted(() => {
  productsStore.getAllProducts()
  window.addEventListener('resize', resizeListener)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
})
// Vue Lifecycle module: END

// Product fetch module: START
const productsStore = useProductsStore()
const products = computed(() => {
  return productsStore.products
})
// Product fetch module: END

// Search module: START
const searchProduct = ref('')
const filteredProducts = computed(() => {
  const query = searchProduct.value.toLowerCase()
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.harga.toString().includes(query) ||
      product.category_name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
  )
})
// Search module: END

// Pagination module: START
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})
const currentPage = ref(1)
const perPage = ref(20)

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const setPage = (page: number) => {
  currentPage.value = page
}
// Pagination module: END

// Modal dialog module: START
const showProductForm = ref(false)
// Modal dialog module: END

// Update product module: START
const productForm = ref<ProductType>({
  id: 0,
  category_id: 0,
  category_name: '',
  name: '',
  description: '',
  sku: '',
  image: '',
  harga: 0
})
const isNewProduct = ref(true)
const isFormEmpty = () => {
  return (
    productForm.value.category_id === 0 ||
    productForm.value.category_name === '' ||
    productForm.value.name === '' ||
    productForm.value.description === '' ||
    productForm.value.sku === '' ||
    productForm.value.harga === 0
  )
}
const handleAddNewProduct = () => {
  isNewProduct.value = true
  showProductForm.value = true
}
const handleEditProduct = (product: ProductType) => {
  isNewProduct.value = false
  productForm.value = product
  showProductForm.value = true
}
const submitProductForm = () => {
  console.log(productForm.value.category_id === 0)
  if (!isFormEmpty()) {
    if (isNewProduct.value) {
      productsStore
        .createProduct(productForm.value)
        .then(() => {
          showProductForm.value = false
        })
        .catch((err) => {
          throw err
        })
    } else {
      productsStore
        .updateProduct(productForm.value)
        .then(() => {
          showProductForm.value = false
        })
        .catch((err) => {
          throw err
        })
    }
  }
}
</script>
