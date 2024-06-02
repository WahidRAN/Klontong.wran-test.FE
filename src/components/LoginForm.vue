<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const isLogin = ref(true)
const handleLogin = async () => {
  const payload = {
    name: username.value,
    password: password.value
  }

  await authStore
    .userLogin(payload)
    .then((result) => {
      router.push('/')
    })
    .catch((err) => {})
}

const fullname = ref('')
const confirmPassword = ref('')
const handleRegister = async () => {
  if (password.value === confirmPassword.value) {
    const payload = {
      name: username.value,
      fullname: fullname.value,
      password: password.value
    }

    await authStore
      .userRegister(payload)
      .then((result) => {
        router.push('/')
      })
      .catch((err) => {
        throw err
      })
  } else {
    throw alert('Kata sandi tidak sama dengan Konfirmasi kata sandi')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mx-4 w-full max-w-md overflow-hidden relative"
    >
      <h2 class="text-center text-2xl font-bold mb-6">Klontong App</h2>
      <transition :name="isLogin ? 'slide-left' : 'slide-right'" appear>
        <form v-if="isLogin" @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Masukkan username Anda"
              v-model="username"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">
              Kata sandi
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Masukkan kata sandi Anda"
              v-model="password"
              required
            />
          </div>
          <div class="flex flex-col items-center gap-2">
            <button
              class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline grow w-full"
              type="submit"
            >
              {{ isLogin ? 'Masuk' : 'Daftar' }}
            </button>
            <p>
              Belum memiliki Akun?
              <span class="text-blue-700 cursor-pointer hover:underline" @click="isLogin = false"
                >Daftar disini</span
              >
            </p>
          </div>
        </form>
        <form v-else @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="fullname">
              Nama Lengkap
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              v-model="fullname"
              required
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Masukkan username Anda"
              v-model="username"
              required
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">
              Kata sandi
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Masukkan kata sandi Anda"
              v-model="password"
              required
            />
          </div>
          <div class="mb-5">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">
              Konfirmasi kata sandi
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Konfirmasi kata sandi Anda"
              v-model="confirmPassword"
              required
            />
          </div>
          <div class="flex flex-col items-center gap-2">
            <button
              class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline grow w-full"
              type="submit"
            >
              {{ isLogin ? 'Masuk' : 'Daftar' }}
            </button>
            <p v-if="isLogin">
              Belum memiliki Akun?
              <span
                class="text-blue-700 cursor-pointer hover:underline"
                @click="isLogin = !isLogin"
              >
                Daftar disini
              </span>
            </p>
            <p v-else>
              Sudah memiliki Akun?
              <span
                class="text-blue-700 cursor-pointer hover:underline"
                @click="isLogin = !isLogin"
              >
                Masuk disini
              </span>
            </p>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.6s ease-in-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  position: absolute;
}

/* slide-right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.6s ease-in-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  position: absolute;
}
</style>
