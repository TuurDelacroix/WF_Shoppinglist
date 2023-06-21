<template>
  <div class="auth">
    <div class="auth-form auth-form-register">
      <h2>Register</h2>
      <RegistrationForm />
    </div>
    <div class="auth-form auth-form-login">
      <h2>Login</h2>
      <LoginForm />
    </div>
  </div>
</template>
  
  
<script>
import RegistrationForm from '../components/RegistrationForm.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
  name: "AutorisationView",
  components: {
    RegistrationForm,
    LoginForm
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/manage');
    }
  }
}
</script>


<style lang="scss">
@media (min-width: 1024px) {
  .auth {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-form {
    width: 40%;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  .auth-form-register {
    margin-right: 2rem;
  }

  .auth-form-login {
    margin-left: 2rem;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.3rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  }

  .auth-buttons {


    margin-top: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background-color: #474747;
    border: none;
    border-radius: 0.3rem;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #474747;
    }

  }

}
</style>