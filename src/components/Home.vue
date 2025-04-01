<script setup>
import { ref, computed, onMounted } from "vue";
import Card from "./Card.vue";

const emit = defineEmits(["add-to-pokedex"]);

const pokemons = ref([]);
const sortHeightDirection = ref("none");
const selectedType = ref("all");

const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await response.json();
  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );
  pokemons.value = detailedPokemons;
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

onMounted(() => {
  fetchPokemons();
});

const toggleHeightSort = () => {
  if (sortHeightDirection.value === "none") {
    sortHeightDirection.value = "asc";
  } else if (sortHeightDirection.value === "asc") {
    sortHeightDirection.value = "desc";
  } else {
    sortHeightDirection.value = "none";
  }
};

const availableTypes = computed(() => {
  const types = new Set();
  pokemons.value.forEach((pokemon) => {
    pokemon.types.forEach((typeInfo) => {
      types.add(typeInfo.type.name);
    });
  });
  return Array.from(types);
});

const filteredPokemons = computed(() => {
  let result = pokemons.value;
  if (sortHeightDirection.value === "asc") {
    result = result.slice().sort((a, b) => a.height - b.height);
  } else if (sortHeightDirection.value === "desc") {
    result = result.slice().sort((a, b) => b.height - a.height);
  } else {
    result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (selectedType.value !== "all") {
    result = result.filter((pokemon) =>
      pokemon.types.some(
        (typeInfo) => typeInfo.type.name === selectedType.value
      )
    );
  }
  return result;
});

const addToPokedex = (pokemon) => {
  emit("add-to-pokedex", pokemon);
};
</script>

<template>
  <section class="p-6 gap-4">
    <!-- Filtres -->
    <div class="mb-6 border-b pb-4 flex justify-start items-center gap-x-3">
      <h1 class="text-2xl font-bold text-center">Choisissez vos Pokémon</h1>
      <div class="flex justify-center gap-4">
        <button
          @click="toggleHeightSort"
          class="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-800 transition hover:cursor-pointer"
          :aria-label="`Trier par taille (${sortHeightDirection})`"
        >
          Trier par taille
          <span v-if="sortHeightDirection === 'asc'">▲</span>
          <span v-else-if="sortHeightDirection === 'desc'">▼</span>
          <span v-else>↕</span>
        </button>
        <div v-if="pokemons.length">
          <label for="type-filter" class="mr-2">Filtrer par type :</label>
          <select
            id="type-filter"
            v-model="selectedType"
            class="px-2 py-1 border rounded hover:cursor-pointer"
          >
            <option value="all">Tous les types</option>
            <option v-for="type in availableTypes" :key="type" :value="type">
              {{ capitalize(type) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Cartes -->

    <div class="flex flex-wrap items-center justify-center gap-4">
      <Card
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @add-to-pokedex="addToPokedex"
      />
    </div>

    <p
      v-if="!filteredPokemons.length"
      class="text-center text-red-500 font-bold mt-4"
    >
      Aucun Pokémon trouvé.
    </p>
  </section>
</template>
