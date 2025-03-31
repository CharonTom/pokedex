<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import "primeicons/primeicons.css";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  inPokedex: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["add-to-pokedex", "remove-from-pokedex"]);
const router = useRouter();

const actionEvent = computed(() =>
  props.inPokedex ? "remove-from-pokedex" : "add-to-pokedex"
);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const handleAction = () => {
  emit(actionEvent.value, props.pokemon);
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

const getTypeClass = (typeName) => {
  return typeColors[typeName] || "bg-gray-500 text-white rounded-xl";
};
</script>

<template>
  <div
    class="bg-pink-200 w-62 p-4 border rounded-xl shadow hover:shadow-lg transition relative"
  >
    <div class="absolute top-2 right-2 flex gap-2">
      <i
        @click="handleAction"
        :class="[
          'pi',
          'bg-white',
          'rounded-sm',
          'p-0.5',
          'border',
          props.inPokedex
            ? 'pi-times text-red-500'
            : 'pi-cart-plus text-green-500',
          'cursor-pointer text-xl',
        ]"
      ></i>
    </div>

    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-full h-auto mb-2 border border-b rounded-xl bg-pink-50"
    />

    <h3 class="text-lg font-semibold text-center mb-2">
      {{ capitalize(pokemon.name) }}
    </h3>

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
    <div class="flex mb-2 gap-x-4 justify-start">
      <span>{{ pokemon.height / 10 }} mètres</span>
      <span>{{ pokemon.weight / 10 }} kg</span>
    </div>

    <div class="flex flex-col gap-2 items-center">
      <button
        @click="seeDetails"
        class="text-xs border border-gray-500 bg-gray-300 px-4 py-2 text-black rounded hover:bg-green-600 transition hover:cursor-pointer"
      >
        See details <i class="pi pi-info-circle"></i>
      </button>
    </div>
  </div>
</template>
