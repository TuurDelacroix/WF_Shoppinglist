<template>
    <form @submit.prevent="submit" class="registration-form">
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
        <label>
            Name:
            <input type="text" v-model="name" />
        </label>
        <label>
            Email:
            <input type="email" v-model="email" />
        </label>
        <label>
            Password:
            <input type="password" v-model="password" />
        </label>
        <button type="submit" :disabled="loading" class="auth-buttons">Register</button>
    </form>
</template>
  

<script>
export default {
    name: "RegistrationForm",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            error: "",
            success: "",
            loading: false
        };
    },
    methods: {
        async submit() {
            this.loading = true;
            try {
                const response = await fetch("http://shoppinglist.tuurwf/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    }),
                });

                const responseData = await response.json()
                console.log(responseData)
                if (!responseData.hasOwnProperty('original')) {
                    // Ok
                    this.success = "Successfully registered"
                    setTimeout(() => {
                        this.success = "";
                    }, 5000);

                    this.name = ""
                    this.email = ""
                    this.password = ""
                }
                else {

                    const errors = responseData.original.error

                    if (errors) {
                        const errorMessages = Object.values(errors).flat()
                        this.error = errorMessages.join("\n")
                        setTimeout(() => {
                        this.error = "";
                        }, 5000);
                    }
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
.registration-form {
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