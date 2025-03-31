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

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-end items-center gap-4">
      <Nav />
    </header>
    <main class="flex-grow p-4 bg-gray-100">
      <router-view
        :pokedex="pokedex"
        @add-to-pokedex="addToPokedex"
        @remove-from-pokedex="removeFromPokedex"
      />
    </main>
    <footer class="bg-gray-200 p-4 text-center">
      <div>This is the PokeFooter</div>
    </footer>
  </div>
</template>
