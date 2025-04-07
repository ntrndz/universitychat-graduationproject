<template>
    <div class="sign-up">
      <div class="tabs">
        <button :class="{ active: !isSignUp }" @click="toggleTab(false)">
          Üye Girişi
        </button>
        <button :class="{ active: isSignUp }" @click="toggleTab(true)">
          Üye Kayıt
        </button>
      </div>
  
      <div v-if="!isSignUp" class="form-container">
        <div class="form-group">
          <input
            v-model="email"
            type="text"
            placeholder="E-posta Adresi *"
            class="input-field"
          />
          <div class="password-field">
            <input
              v-model="password1"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Şifre *"
              class="input-field"
            />
            <img
              :src="passwordVisible ? '/images/eye-open.png' : '/images/eye-closed.png'"
              alt="Toggle Password Visibility"
              class="toggle-password-icon"
              @click="togglePasswordVisibility"
            />
          </div>
        </div>
        <button @click="submitForm(false)" class="submit-btn">Giriş Yap</button>
      </div>
  
      <div v-if="isSignUp" class="form-container">
        <div class="form-group">
          <input
            v-model="ad"
            type="text"
            placeholder="Ad *"
            class="input-field"
          />
          <input
            v-model="soyad"
            type="text"
            placeholder="Soyad *"
            class="input-field"
          />
          <input
            v-model="email"
            type="email"
            placeholder="E-posta Adresi *"
            class="input-field"
          />
          <div class="password-field">
            <input
              v-model="password1"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Şifre *"
              class="input-field"
            />
            <img
              :src="passwordVisible ? '/images/eye-open.png' : '/images/eye-closed.png'"
              alt="Toggle Password Visibility"
              class="toggle-password-icon"
              @click="togglePasswordVisibility"
            />
          </div>
          <div class="password-field">
            <input
              v-model="password2"
              :type="passwordVisible1 ? 'text' : 'password'"
              placeholder="Şifre Tekrar *"
              class="input-field"
            />
            <img
              :src="passwordVisible1 ? '/images/eye-open.png' : '/images/eye-closed.png'"
              alt="Toggle Password Visibility"
              class="toggle-password-icon1"
              @click="togglePasswordVisibility1"
            />
          </div>
        </div>
        <button @click="submitForm(true)" class="submit-btn">Kayıt Ol</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '@/composables/useAuth';
  
  export default defineComponent({
    name: 'SignUpLogin',
    setup() {
      // Form durumları
      const isSignUp = ref(false);
      const ad = ref('');
      const soyad = ref('');
      const email = ref('');
      const password1 = ref('');
      const password2 = ref('');
      const errors = ref<{ username?: string; password?: string }>({});
  
      // Şifre görünürlüğü
      const passwordVisible = ref(false);
      const passwordVisible1 = ref(false);
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
      const togglePasswordVisibility1 = () => {
        passwordVisible1.value = !passwordVisible1.value;
      };
  
      // Auth composable ve router kullanımı
      const { login, register } = useAuth();
      const router = useRouter();
  
      // Giriş ve kayıt işlemleri
      const submitForm = async (isSignUpForm: boolean) => {
        if (!email.value) {
          alert("E-posta adresi kısmını doldurun.");
          return;
        }
  
        if (!isSignUpForm) {
          try {
            const res = await login(email.value.trim(), password1.value.trim());
            console.log('🔑 Giriş başarılı! Gelen veri:', res)

            if (!res.accessToken) {
              alert('Token alınamadı. Lütfen tekrar deneyin.');
              return;
            }

            alert("Giriş başarılı!");
            router.push('/chat');
          } catch (err) {
            console.error("Login error:", err);
            alert("Giriş başarısız. E-posta veya şifre hatalı olabilir.");
          }
        }  else {
          // Kayıt işlemi
          if (!ad.value || !soyad.value || !email.value || !password1.value || !password2.value) {
            alert("Lütfen tüm alanları doldurun.");
            return;
          }
  
          if (password1.value !== password2.value) {
            alert("Şifreler eşleşmiyor.");
            return;
          }
  
          try {
            await register(email.value, password1.value, ad.value, soyad.value);
            alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
            router.push('/login'); // Artık /chat yerine /login'e yönlendiriyoruz
          } catch (err) {
            console.error("Kayıt error:", err);
            alert("Kayıt işlemi başarısız.");
          }
        }
      };
  
      return {
        isSignUp,
        ad,
        soyad,
        email,
        password1,
        password2,
        toggleTab: (val: boolean) => (isSignUp.value = val),
        submitForm,
        passwordVisible,
        passwordVisible1,
        togglePasswordVisibility,
        togglePasswordVisibility1,
      };
    },
  });
  </script>

  <style scoped lang="scss">
  .sign-up {
    max-width: 500px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .tabs button {
    flex: 1;
    padding: 10px;
    border: none;
    background: #ffffff;
    cursor: pointer;
  }
  
  .tabs button.active {
    color: #e30613;
    font-weight: bold;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .input-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    margin-top: 10px;
    background-color: white;
    cursor: pointer;
  }
  
  .submit-btn {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background: #e30613;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background: #b70011;
  }
  
  .social-login {
    text-align: center;
    margin-top: 20px;
  }
  
  .social-btn {
    display: block;
    margin: 5px 0;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  
  .facebook {
    background: #3b5998;
  }
  
  .google {
    background: #db4437;
  }
  
  .separator {
    margin: 20px 0;
    font-weight: bold;
    color: #999;
  }
  
  .password-field {
    position: relative;
    width: 100%;
    margin-bottom: 15px;
  }
  
  .toggle-password-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
  .toggle-password-icon1 {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
  .input-group-append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  .text-gray {
    color: #888;
    font-size: 18px;
  }
  </style>
  