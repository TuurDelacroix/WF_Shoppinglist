<template>
    <div class="language-container">
        <button class="language-btn" @click="toggleLanguage">{{ language }} 🌐</button>
    </div>

    <Filter class="filter" v-model:perPage="perPage" v-model:page="page" v-model:totalItems="shoppingList.total"
        :language="language" @previous="setPage" @next="setPage"></Filter>

    <div class="shopping-cart">
        <h2>📋{{ title[language] }} ({{ shoppingList.total }})</h2>
        <div class="cart-items">
            <div class="loader-container" v-show="!hasItems">
                <div class="loader"></div>
            </div>
            <ShoppingItem v-show="hasItems" v-for="product in shoppingList.data" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script>
import ShopListService from '../services/ShopListService.js'
import ShoppingItem from './ShoppingItem.vue';
import Filter from '../components/Filter.vue'



export default {
    name: "ShoppingItems",
    components: {
        ShoppingItem,
        Filter
    },
    props: {
        language: {
            default: "nl"
        },
        perPage: {
            default: 10
        },
        page: {
            default: 1
        }
    },

    emits: ['update:language'],

    data() {
        return {
            "service": new ShopListService(),
            shoppingList: false,
            loaded: false,
            perPage: 5,
            page: 1,
            totalPages: 0,
            title: { en: "Shoppinglist", nl: "Boodschappenlijst" }
        }
    },
    watch: {
        perPage: {
            handler: async function () {
                if (!this.loaded)
                    return;
                await this.loadShopListItems();
            },
            immediate: true
        },
        page: {
            handler: async function () {
                if (!this.loaded)
                    return;
                await this.loadShopListItems();
            },
            immediate: true
        },
        language: {
            handler: async function () {
                if (!this.loaded)
                    return;
                await this.loadShopListItems();
            },
            immediate: true
        }
    },
    computed: {
        hasItems() {
            return this.shoppingList !== false;
        }
    },
    async mounted() {
        await this.loadShopListItems();
        this.loaded = true;
    },
    methods: {
        async loadShopListItems() {
            this.shoppingList = await this.service
                .setPage(this.page)
                .setLanguage(this.language)
                .setPerPage(this.perPage)
                .list();
        },
        setPage(page) {
            page = parseInt(page);
            if (page < 1)
                page = 1;

            this.page = page;
            this.loadShopListItems()
        },
        toggleLanguage() {
            const newLanguage = this.language === "nl" ? "en" : "nl";
            this.$emit("update:language", newLanguage);
        }
    }
}
</script>

<style lang="scss">
.language-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.language-btn {
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #eee;
    border-radius: 5px;
  }
}

.filter {
    padding: 1rem 0 1rem 0;
}

.shopping-cart {
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;

    h2 {
        margin-bottom: 20px;
    }

    .cart-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        grid-gap: 20px;
        overflow: auto;
        border-radius: 10px;
    }

    .cart-item {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
    }

    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        width: 100%;

        button {
            background-color: #f0f0f0;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 10px;

            &:last-child {
                margin-right: 0;
            }

            &.active {
                background-color: #ccc;
            }
        }
    }

    .pagination-arrow {
        color: #666;
        margin: 0 10px;
        cursor: pointer;
    }
}
</style>