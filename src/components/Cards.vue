<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
const emit = defineEmits(["add-to-pokedex"]);

const pokemons = ref([]);

const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  pokemons.value = detailedPokemons;
  console.log(pokemons.value);
};

// Fonction pour capitaliser la première lettre
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

onMounted(() => {
  fetchPokemons();
});

const sortHeightDirection = ref("none");
const selectedType = ref("all");

// Fonction de basculement du tri par hauteur
const toggleHeightSort = () => {
  if (sortHeightDirection.value === "none") {
    sortHeightDirection.value = "asc";
  } else if (sortHeightDirection.value === "asc") {
    sortHeightDirection.value = "desc";
  } else {
    sortHeightDirection.value = "none";
  }
};

// Calcul des types disponibles à partir des Pokémon récupérés
const availableTypes = computed(() => {
  const types = new Set(); // Set permet de stocker des données sans doublons
  pokemons.value.forEach((pokemon) => {
    pokemon.types.forEach((typeInfo) => {
      types.add(typeInfo.type.name);
    });
  });
  return Array.from(types);
});

// Propriété calculée pour appliquer à la fois le filtre par type et le tri
const filteredPokemons = computed(() => {
  let result = pokemons.value;

  // Tri selon le critère de hauteur ou alphabétique par défaut
  if (sortHeightDirection.value === "asc") {
    result = result.slice().sort((a, b) => a.height - b.height);
  } else if (sortHeightDirection.value === "desc") {
    result = result.slice().sort((a, b) => b.height - a.height);
  } else {
    result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  // Filtrer par type si un type est sélectionné
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
  // Émettre l'événement d'ajout
  emit("add-to-pokedex", pokemon);
};
</script>

<template>
  <section
    class="p-8 rounded-xl shadow-lg"
    style="background: radial-gradient(circle at top left, #fceabb, #f8b500)"
  >
    <!-- En-tête et actions -->
    <div class="mb-12 border-b border rounded-xl p-4">
      <h1 class="text-center text-4xl mb-2">Choisissez vos Pokémon</h1>
      <div class="flex justify-center items-center gap-x-4">
        <button
          @click="toggleHeightSort"
          class="bg-gradient-to-r from-yellow-400 to-red-500 text-gray-700 w-36 h-10 rounded-lg transition-transform duration-300 hover:scale-105"
        >
          Trier par taille
          <span v-if="sortHeightDirection === 'asc'">▲</span>
          <span v-else-if="sortHeightDirection === 'desc'">▼</span>
          <span v-else>↕</span>
        </button>
        <!-- Filtres -->
        <div v-if="pokemons.length" class="flex items-center justify-center">
          <select
            id="type-filter"
            v-model="selectedType"
            class="bg-gradient-to-r from-yellow-400 to-red-500 text-gray-700 w-36 h-10 rounded-lg focus:outline-none"
          >
            <option value="all">All types</option>
            <option v-for="type in availableTypes" :key="type" :value="type">
              {{ capitalize(type) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Affichage des cartes Pokémon -->
    <div
      class="flex flex-wrap gap-5 justify-center"
      v-if="filteredPokemons.length"
    >
      <RouterLink to="/details">
        >
        <div
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          class="w-52 bg-white/90 p-4 rounded-lg border-2 border-red-500 shadow-md transition-transform duration-300 ease hover:-translate-y-[5px]"
        >
          <img
            :src="pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="w-full h-auto block cursor-pointer mb-2 border rounded-xl bg-white"
          />
          <div>
            <h3 class="text-center text-lg mb-2">
              {{ capitalize(pokemon.name) }}
            </h3>
            <div class="flex justify-between">
              <div>{{ pokemon.height }}m</div>
              <div>{{ pokemon.weight }}Kg</div>
            </div>
            <div class="flex justify-center gap-2 mt-2">
              <span
                v-for="(type, index) in pokemon.types"
                :key="index"
                class="text-sm"
              >
                {{ capitalize(type.type.name) }}
              </span>
            </div>
            <button
              @click="addToPokedex(pokemon)"
              class="mt-4 bg-gradient-to-r from-yellow-400 to-red-500 text-gray-700 w-36 h-10 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              Add to Inventory
            </button>
          </div>
        </div>
      </RouterLink>
    </div>

    <p v-else class="text-red-500 font-bold text-center mt-8 text-xl">
      Aucun Pokémon trouvé.
    </p>
  </section>
</template>
