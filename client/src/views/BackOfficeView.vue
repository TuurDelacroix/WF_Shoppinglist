<template>
  <div class="backo">
    <h1>Overview</h1>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">{{ success }}</p>
    <h3>Manage Current Products</h3>
    <label for="search">Search by Name</label>
    <input type="text" id="search" v-model="searchText">

    <table>
      <thead>
        <tr>
          <th>
            <button @click="sortItemsById('asc')" class="sort-button">↑</button>
            ID
            <button @click="sortItemsById('desc')" class="sort-button">↓</button>
          </th>
          <th>Name</th>
          <th>Description</th>
          <th>
            <button @click="sortItemsByPrice('asc')" class="sort-button">↑</button>
            Price
            <button @click="sortItemsByPrice('desc')" class="sort-button">↓</button>
          </th>
          <th>Qty</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
        <tr>{{ item.translations.find(t => t.lang === 'nl').name }}</tr>
        <tr>{{ item.translations.find(t => t.lang === 'en').name }}</tr>
        </td>
        <td>
          <tr>{{ item.translations.find(t => t.lang === 'nl').description }}</tr>
          <tr>{{ item.translations.find(t => t.lang === 'en').description }}</tr>
        </td>
        <td>
          <tr>€{{ item.translations.find(t => t.lang === 'nl').price }}</tr>
          <tr>${{ item.translations.find(t => t.lang === 'en').price }}</tr>
        </td>
        <td>
          <input type="number" min="1" id="quantity" v-model="item.quantity" @change="updateQuantity(item)">
        </td>
        <td class="button-container">
          <button type="submit" @click="removeItem(item.id)">Delete</button>
        </td>
        </tr>
      </tbody>
    </table>

    <div class="new-product-form">
      <h2>Create a new product</h2>
      <p v-if="adderror" class="error-message">{{ adderror }}</p>
      <p v-if="addsuccess" class="success-message">{{ addsuccess }}</p>
      <form @submit.prevent="addItem">
        <div>
          <label for="name-nl">Name (Dutch)</label>
          <input type="text" id="name-nl" v-model="newName.nl" required>
        </div>
        <div>
          <label for="name-en">Name (English)</label>
          <input type="text" id="name-en" v-model="newName.en" required>
        </div>
        <div>
          <label for="description-nl">Description (Dutch)</label>
          <textarea id="description-nl" v-model="newDescription.nl" required></textarea>
        </div>
        <div>
          <label for="description-en">Description (English)</label>
          <textarea id="description-en" v-model="newDescription.en" required></textarea>
        </div>
        <div>
          <label for="price-nl">Price (Dutch)</label>
          <input type="number" min="1" id="price-nl" v-model="newPrice.nl" step="1" required>
        </div>
        <div>
          <label for="price-en">Price (English)</label>
          <input type="number" min="1" id="price-en" v-model="newPrice.en" step="1" required>
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input type="number" id="quantity" v-model="newQuantity" min="1" required>
        </div>
        <div>
          <label for="image">Image URL</label>
          <input type="text" id="image" v-model="newImage">
        </div>
        <button type="submit">Create product</button>
      </form>
    </div>
  </div>
</template>



<script>
import ShopListService from '@/services/ShopListService.js';
import { faLine } from '@fortawesome/free-brands-svg-icons';

export default {
    name: "BackOfficeView",
    data() {
        return {
            items: [],
            service: new ShopListService(),
            error: "",
            success: "",
            newName: { nl: "", en: "" },
            newDescription: { nl: "", en: "" },
            newPrice: { nl: "", en: "" },
            newQuantity: "",
            newImage: "",
            adderror: "",
            addsuccess: "",
            sortOrder: null,
            searchText: ""
        };
    },
    async mounted() {
        this.sortOrder = "asc";
        const token = localStorage.getItem("token");
        if (token == null) {
            this.$router.push("/login");
        }
        else {
            await this.loadShopListItems();
        }
    },
    computed: {
        filteredItems() {
            if (this.searchText === "") {
                return this.items.data;
            }
            else {
                const search = this.searchText.toLowerCase();
                return this.items.data.filter(item => {
                    const nameEN = item.translations.find(t => t.lang === "en").name.toLowerCase();
                    const nameNL = item.translations.find(t => t.lang === "nl").name.toLowerCase();
                    return nameEN.includes(search) || nameNL.includes(search);
                });
            }
        }
    },
    methods: {
        async loadShopListItems() {
            this.items = await this.service.all();
        },
        sortItemsByPrice(order) {
            if (order === "asc") {
                this.items.data.sort((a, b) => {
                    return a.translations.find(t => t.lang === "nl").price - b.translations.find(t => t.lang === "nl").price;
                });
            }
            else if (order === "desc") {
                this.items.data.sort((a, b) => {
                    return b.translations.find(t => t.lang === "nl").price - a.translations.find(t => t.lang === "nl").price;
                });
            }
        },
        sortItemsById(order) {
            if (order === "asc") {
                this.items.data.sort((a, b) => a.id - b.id);
            }
            else if (order === "desc") {
                this.items.data.sort((a, b) => b.id - a.id);
            }
        },
        async updateQuantity(item) {
            const responseData = await this.service.update(item);
            if (responseData.hasOwnProperty("message")) {
                this.success = `${responseData.message}`;
                setTimeout(() => {
                    this.success = "";
                }, 5000);
            }
            else {
                this.success = "Something went wrong...";
                setTimeout(() => {
                    this.success = "";
                }, 5000);
            }
        },
        async removeItem(itemId) {
            const responseData = await this.service.remove(itemId);
            if (responseData.hasOwnProperty("message")) {
                this.success = `${responseData.message}`;
                setTimeout(() => {
                    this.success = "";
                    this.loadShopListItems();
                }, 2000);
            }
            else {
                this.error = "Something went wrong...";
                setTimeout(() => {
                    this.error = "";
                }, 5000);
            }
        },
        async addItem() {
            try {
                const newProduct = {
                    "name": {
                        "nl": this.newName.nl,
                        "en": this.newName.en
                    },
                    "description": {
                        "nl": this.newDescription.nl,
                        "en": this.newDescription.en
                    },
                    "price": {
                        "nl": this.newPrice.nl,
                        "en": this.newPrice.en
                    },
                    "quantity": this.newQuantity,
                    "image": this.newImage
                };
                const responseData = await this.service.addItem(newProduct);
                if (responseData.hasOwnProperty("message")) {
                        this.addsuccess = `${responseData.message}`;
                        this.newName.nl = "",
                        this.newName.en = "",
                        this.newDescription.nl = "";
                        this.newDescription.en = "";
                        this.newPrice.nl = "",
                        this.newPrice.en = "",
                        this.newQuantity = "",
                        this.newImage = "",
                        setTimeout(() => {
                            this.addsuccess = "";
                            this.loadShopListItems();
                        }, 2000);
                }
                else {
                    this.adderror = "Something went wrong...";
                    setTimeout(() => {
                        this.adderror = "";
                    }, 5000);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    },
    components: { faLine }
};
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .backo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  table {
    background-color: white;
    border-collapse: collapse;
    margin: 2rem 0;
    width: 100%;
    border-radius: 5px;
  }

  th,
  td {
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  .new-product-form {
    margin-top: 2rem;
    width: 100%;
    max-width: 500px;
  }

  .new-product-form label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .new-product-form input[type="text"],
  .new-product-form textarea,
  .new-product-form input[type="number"] {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .new-product-form button[type="submit"] {
    display: block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .new-product-form button[type="submit"]:hover {
    background-color: #3e8e41;
  }

  .button-container {

    display: flex;
    flex-direction: column;

    button {

      background-color: #f5574c;
      font-size: 0.8rem;
      font-weight: bold;
      color: #fff;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;


      &:hover {
        background-color: #d62828;
      }
    }

  }

  #search,
  #quantity {
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 14px;
    margin-bottom: 10px;

    &:focus {
      box-shadow: 5px #666;
    }
  }

  #search {
    &:hover {
      transform: scale(1.1);
    }
  }



  .sort-button {

    background-color: transparent;
    border: none;
    color: black;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      transform: scale(1.5);
    }

    &:active {
      box-shadow: 1px 1px 1px 1px #666;
      transform: translateY(4px);
    }
  }

}

.error-message {
  color: #f44336;
  margin-bottom: 10px;
  font-size: 14px;
}

.success-message {
  color: #6bcc33;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
  