<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-200 p-4">
      <div class="text-center font-bold mb-2">This is the Logo</div>
      <Nav />
    </header>
    <main class="flex-grow p-4">
      <router-view
        :pokedex="pokedex"
        @add-to-pokedex="addToPokedex"
        @remove-from-pokedex="removeFromPokedex"
      />
    </main>
    <footer class="bg-gray-200 p-4 text-center">
      <div>This is the footer</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "./components/Nav.vue";

const pokedex = ref([]);

const addToPokedex = (pokemon) => {
  pokedex.value.push(pokemon);
  console.log("Panier mis à jour :", pokedex.value);
};

const removeFromPokedex = (pokemonId) => {
  pokedex.value = pokedex.value.filter((pokemon) => pokemon.id !== pokemonId);
  console.log("Pokedex mis à jour après suppression :", pokedex.value);
};
</script>
