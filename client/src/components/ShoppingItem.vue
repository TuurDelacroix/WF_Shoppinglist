<template>
  <div class="shopping-cart-item">
    <div class="image">
      <img :src="product.image" alt="Product Image" />
    </div>
    <div class="details">
      <h3>{{ product.translations.name }}</h3>
      <p>{{ product.translations.description }}</p>
      <p>{{ product.quantity }} x {{ currency[product.translations.lang] }}{{ product.translations.price }}</p>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'ShoppingItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currency: { en: "$", nl: "€" }
    }
  }
}
</script>
  
<style scoped>
.shopping-cart-item {
  display: flex;
  margin-bottom: 1rem;
}

.shopping-cart-item .image {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  overflow: hidden;
}

.shopping-cart-item .image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.shopping-cart-item .details h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.shopping-cart-item .details p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}
</style>