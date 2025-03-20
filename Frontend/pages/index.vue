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
            :src="
              passwordVisible
                ? '/images/eye-open.png'
                : '/images/eye-closed.png'
            "
            alt="Toggle Password Visibility"
            class="toggle-password-icon"
            @click="togglePasswordVisibility"
          />
        </div>
      </div>
      <button @click="submitForm" class="submit-btn">Giriş Yap</button>
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
          placeholder="E-posta Adresi"
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
            :src="
              passwordVisible
                ? '/images/eye-open.png'
                : '/images/eye-closed.png'
            "
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
            :src="
              passwordVisible1
                ? '/images/eye-open.png'
                : '/images/eye-closed.png'
            "
            alt="Toggle Password Visibility"
            class="toggle-password-icon1"
            @click="togglePasswordVisibility1"
          />
        </div>
      </div>

      <button @click="submitForm" class="submit-btn">Kayıt Ol</button>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const passwordVisible = ref(false); // Şifre görünürlüğü kontrolü
const passwordVisible1 = ref(false); // Şifre görünürlüğü kontrolü
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const togglePasswordVisibility1 = () => {
  passwordVisible1.value = !passwordVisible1.value;
};

export default defineComponent({
  name: "SignUp",
  setup() {
    const isSignUp = ref(false);
    const ad = ref("");
    const soyad = ref("");
    const email = ref(""); // E-posta adresinin kullanıcı adı kısmı
    const errors = ref<{ username?: string; password?: string }>({});
    const password1 = ref("");
    const password2 = ref("");
    

    const toggleTab = (signUp: boolean) => {
      isSignUp.value = signUp;
    };

    const submitForm = () => {

      if (!email.value) {
        alert("E-posta adresi kısmını doldurun.");
        return;
      }

      if (isSignUp.value) {

              // Giriş işlemi
              if (!password1.value) {
          alert("Lütfen şifrenizi girin.");
          return;
        }
        alert("Giriş başarılı!");
        
        
       
      } else {
    // Kayıt işlemi
    if (!ad.value || !soyad.value || !email.value) {
          alert("Lütfen tüm alanları doldurun.");
          return;
        }
        if (password1.value !== password2.value) {
          alert("Şifreler eşleşmiyor.");
          return;
        }
        alert("Kayıt başarılı!");
       
        
      }

      console.log("Form Data:", {
        ad: ad.value,
        soyad: soyad.value,
        email: email,
        password1: password1.value,
      });
    };

    return {
      isSignUp,
      ad,
      soyad,
      email,
      password1,
      password2,
      toggleTab,
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
  width: 100%; /* Genişlik dış kutuya tam uyacak şekilde ayarlandı */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Padding ve border dahil genişliği hesaplar */
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
  margin-top: 20px; /* Kayıt Ol butonuyla şifre kutuları arasına mesafe ekler */
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
  width: 100%; /* Kutucuğun genişliğini artırmak için %100 yapıldı */
  margin-bottom: 15px; /* Şifre kutuları arasına mesafe ekler */
}


.toggle-password-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px; /* İsteğe bağlı: ikon boyutu */
  height: 20px; /* İsteğe bağlı: ikon boyutu */
}

.toggle-password-icon1 {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px; /* İsteğe bağlı: ikon boyutu */
  height: 20px; /* İsteğe bağlı: ikon boyutu */
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
