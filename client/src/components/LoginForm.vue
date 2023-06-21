<template>
    <form @submit.prevent="submit" class="login-form">
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
        <label>
            Email:
            <input type="email" v-model="email" />
        </label>
        <label>
            Password:
            <input type="password" v-model="password" />
        </label>
        <button type="submit" :disabled="loading" class="auth-buttons">Log in</button>
    </form>
</template>

<script>
import { faWindows } from '@fortawesome/free-brands-svg-icons';

export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
            error: "",
            success: "",
            loading: false,
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            try {
                const response = await fetch("http://shoppinglist.tuurwf/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                });

                const responseData = await response.json()

                console.log(responseData)

                if (responseData.hasOwnProperty('errors'))
                {
                    this.error = Object.values(responseData.errors).flat().join("\n")
                    setTimeout(() => {
                        this.error = "";
                        }, 5000);
                }
                else if (responseData.hasOwnProperty('error'))
                {
                    this.error = responseData.error
                    setTimeout(() => {
                        this.error = "";
                        }, 5000);
                }

                if (response.ok && responseData.hasOwnProperty("authorisation"))
                {
                    localStorage.setItem('token', `Bearer ${responseData.authorisation.token}`)
                    this.$router.push('/manage');
                    window.location.reload()
                }

            } catch (error) {
                this.error = "An error occurred.";
            }
            this.loading = false;
        },
    },
};
</script>


<style lang="scss">
.login-form {
    .error-message {
        color: #f44336;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .success-message {
        color: #82e449;
        margin-bottom: 10px;
        font-size: 14px;
    }
}
</style>