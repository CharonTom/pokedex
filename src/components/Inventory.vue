<script setup>
import Card from "./Card.vue";

const props = defineProps({
  pokedex: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["remove-from-pokedex"]);

const removeFromPokedex = (pokemon) => {
  emit("remove-from-pokedex", pokemon.id);
};
</script>

<template>
  <section class="p-6">
    <h2 class="text-2xl font-bold mb-4">My Inventory</h2>
    <div v-if="pokedex.length" class="flex flex-wrap gap-4">
      <Card
        v-for="pokemon in pokedex"
        :key="pokemon.id"
        :pokemon="pokemon"
        :inPokedex="true"
        @remove-from-pokedex="removeFromPokedex"
      />
    </div>
    <p v-else class="text-center text-red-500 font-bold mt-4">
      No Pokemon found in your Invotory.
    </p>
  </section>
</template>

<style scoped></style>
