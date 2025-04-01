<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const pokemonName = route.params.pokemonName;

console.log(pokemonName); // This should log the pokemon name, like 'beedrill'
</script>

<template>
  <div>
    <h1>Details for {{ pokemonName }}</h1>
    <!-- Add the rest of your details page content here -->
  </div>
</template>
