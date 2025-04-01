<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const route = useRoute();
const pokemonName = route.params.pokemonName;

const pokemon = ref(null);

const fetchPokemonDetails = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();
  pokemon.value = data;
  console.log(data);
};

onMounted(() => {
  fetchPokemonDetails();
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<template>
  <div class="p-6 max-w-screen-lg mx-auto">
    <div v-if="pokemon" class="bg-white shadow-xl rounded-xl p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-semibold">{{ capitalize(pokemon.name) }}</h1>
        <img
          :src="pokemon.sprites.front_default"
          alt="Pokemon Sprite"
          aria-hidden="true"
          class="w-36 h-36 rounded-full border-2 border-gray-300"
        />
      </div>

      <div class="mb-6 flex gap-2">
        <span
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="bg-blue-500 text-white px-3 py-1 rounded-full"
        >
          {{ capitalize(type.type.name) }}
        </span>
      </div>

      <div class="flex gap-8 mb-6">
        <div class="text-center">
          <h3 class="text-xl font-semibold">Height</h3>
          <p>{{ pokemon.height / 10 }} meters</p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-semibold">Weight</h3>
          <p>{{ pokemon.weight / 10 }} kg</p>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-3">Stats</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="text-center">
            <h3 class="text-lg font-semibold">HP</h3>
            <p>{{ pokemon.stats[0].base_stat }}</p>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold">Attack</h3>
            <p>{{ pokemon.stats[1].base_stat }}</p>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold">Defense</h3>
            <p>{{ pokemon.stats[2].base_stat }}</p>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold">Speed</h3>
            <p>{{ pokemon.stats[5].base_stat }}</p>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-3">Abilities</h2>
        <div class="flex gap-2 flex-wrap">
          <span
            v-for="(ability, index) in pokemon.abilities"
            :key="index"
            class="bg-green-500 text-white px-3 py-1 rounded-full"
          >
            {{ capitalize(ability.ability.name) }}
          </span>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="$router.push('/')"
          class="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition"
        >
          Back to Pokedex
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  background-color: #f9f9f9;
}
.shadow-xl {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.rounded-xl {
  border-radius: 15px;
}
.text-center {
  text-align: center;
}
</style>
