<script setup>
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-pokedex"]);
const router = useRouter();

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const addToPokedex = () => {
  emit("add-to-pokedex", props.pokemon);
};

const seeDetails = () => {
  router.push("/details");
};

const typeColors = {
  fire: "bg-red-500 text-white rounded-xl",
  water: "bg-blue-500 text-white rounded-xl",
  grass: "bg-green-500 text-white rounded-xl",
  electric: "bg-yellow-500 text-black rounded-xl",
  poison: "bg-purple-500 text-white rounded-xl",
  // Ajoute d'autres types selon tes besoins
};

// Fonction qui retourne la classe en fonction du type
const getTypeClass = (typeName) => {
  return typeColors[typeName] || "bg-gray-500 text-white rounded-xl";
};
</script>

<template>
  <div
    class="bg-pink-200 w-62 p-4 border rounded-xl shadow hover:shadow-lg transition"
  >
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-full h-auto mb-2 border border-b rounded-xl bg-pink-50"
    />

    <!-- name -->

    <h3 class="text-lg font-semibold text-center mb-2">
      {{ capitalize(pokemon.name) }}
    </h3>

    <!-- type  -->
    <div class="flex justify-start gap-2 mb-2">
      <span
        v-for="(type, index) in pokemon.types"
        :key="index"
        :class="[
          'text-sm',
          'border',
          'px-2',
          'rounded',
          'border-gray-600',
          getTypeClass(type.type.name),
        ]"
      >
        {{ capitalize(type.type.name) }}
      </span>
    </div>
    <!-- details  -->

    <div class="flex mb-2 gap-x-4 justify-center">
      <span>{{ pokemon.height / 10 }} mètres</span>
      <span>{{ pokemon.weight / 10 }} kg</span>
    </div>

    <!-- Buttons part -->

    <div class="flex flex-col gap-2 items-center">
      <button
        @click="addToPokedex"
        class="text-xs w-3/4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition hover:cursor-pointer"
      >
        Add to Inventory
      </button>
      <button
        @click="seeDetails"
        class="text-xs w-3/4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition hover:cursor-pointer"
      >
        See details
      </button>
    </div>
  </div>
</template>
