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
</script>

<template>
  <div class="p-4 border rounded shadow hover:shadow-lg transition">
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-full h-auto mb-2"
    />
    <h3 class="text-lg font-semibold text-center mb-2">
      {{ capitalize(pokemon.name) }}
    </h3>
    <div class="flex justify-between mb-2">
      <span>{{ pokemon.height }}m</span>
      <span>{{ pokemon.weight }}Kg</span>
    </div>
    <div class="flex justify-center gap-2 mb-2">
      <span
        v-for="(type, index) in pokemon.types"
        :key="index"
        class="text-sm border px-2 rounded"
      >
        {{ capitalize(type.type.name) }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <button
        @click="addToPokedex"
        class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add to Inventory
      </button>
      <button
        @click="seeDetails"
        class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        See details
      </button>
    </div>
  </div>
</template>
