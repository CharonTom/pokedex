<script setup>
import {} from "vue";

// Déclaration de la prop "pokedex"
const props = defineProps({
  pokedex: {
    type: Array,
    required: true,
  },
});

// Définition de l'événement à émettre vers le parent
const emit = defineEmits(["remove-from-pokedex"]);

// Fonction pour émettre l'événement de suppression
function removeFromPokedex(pokemonId) {
  emit("remove-from-pokedex", pokemonId);
}
</script>

<template>
  <section class="pokedex">
    <h2>Mon Pokedex</h2>
    <div v-if="pokedex && pokedex.length">
      <ul>
        <li v-for="pokemon in pokedex" :key="pokemon.id">
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
          <span>{{ pokemon.name }}</span>
          <button @click="removeFromPokedex(pokemon.id)">❌</button>
        </li>
      </ul>
    </div>
    <p v-else>Aucun Pokémon dans le panier.</p>
  </section>
</template>

<style scoped></style>
