<template>
    <div class="filter">
        <div class="pagination">
            <button @click="previous"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
            <span>{{ pageLabel[language] }} {{page}} / {{totalPages}}</span>
            <button @click="next"><font-awesome-icon icon="fa-solid fa-arrow-right" /></button>
        </div>
        <div class="per-page">
            <label>{{ perPageLabel[language] }}</label>
            <input type="number" :value="perPage" @input="updatePerPage"/>
        </div>
        <div class="page">
            <label>{{ pageLabel[language] }}</label>
            <input type="number" :max="totalPages" min="1" :value="page" @input="updatePage"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Filter',
    props: {
        perPage: {
            required: true
        },
        page: {
            required: true
        },
        totalItems: {
            required: true
        },
        language: {
            required: true
        }
    },
    data() {
        return {
            perPageLabel: { en: "Products per page:", nl: "Producten per pagina:" },
            pageLabel: { en: "Page", nl: "Pagina" }
        }
    },

    emits: ['previous', 'next', 'update:perPage', 'update:page'],

    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        }
    },
    methods: {
        previous() {
            const previousPage = parseInt(this.page) - 1
            this.$emit('previous', previousPage);
        },
        next(){
            const nextPage = parseInt(this.page) + 1;
            if (nextPage <= this.totalPages){
                this.$emit('next', nextPage);
            }
        },


        updatePerPage(event){
            this.$emit('update:perPage', event.target.value);
            this.$emit('update:page', 1);
        },
        updatePage(event){
            if (event.target.value > this.totalPages)
            {
                this.$emit('update:page', this.totalPages);
            }
            else {
                this.$emit('update:page', event.target.value);
            }
        },

    }
}
</script>

<style lang="scss">
.filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;

    h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-right: 1rem;
    }

    .pagination {
        display: flex;
        align-items: center;

        button {
            border: none;
            background-color: #f0f0f0;
            padding: 0.5rem;
            border-radius: 0.3rem;
            cursor: pointer;
            margin: 0 0.5rem;

            &:hover {
                background-color: #d0d0d0;
            }

            &:disabled {
                opacity: 0.5;
                cursor: default;
            }
        }

        span {
            font-size: 1.1rem;
            margin: 0 1rem;
        }
    }

    .per-page,
    .page {
        display: flex;
        align-items: center;
        margin: 0 1rem;

        label {
            font-size: 1.1rem;
            margin-right: 0.5rem;
        }

        input {
            width: 4rem;
            border: none;
            border-radius: 0.3rem;
            padding: 0.5rem;
            font-size: 1.1rem;

            &:focus {
                outline: none;
                box-shadow: 0 0 0 2px #007bff;
            }
        }
    }
}

</style>