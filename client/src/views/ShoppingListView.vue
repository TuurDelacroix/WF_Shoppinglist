<template>
  <div class="shoppingitems">
    <ShoppingItems :perPage="perPage" :page="page" v-bind:language="language" v-on:update:language="handleLanguageUpdate"></ShoppingItems>
  </div>
</template>

<script>
import ShoppingItems from '../components/ShoppingItems.vue'


const LANGUAGES = ["nl", "en"]

export default {
  name: 'ShoppingListView',
  components: {
    ShoppingItems,
  },
  data() {
    return {
      language: "nl",
      page: 1,
      perPage: 1,
    }
  },
  methods: {
    handleLanguageUpdate(newLanguage) {
      this.language = newLanguage
    }
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .shoppingitems {
    min-height: 100vh;
    align-items: center;
  }
}
</style>