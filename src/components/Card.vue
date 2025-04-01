<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import "primeicons/primeicons.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

  if (actionEvent.value === "add-to-pokedex") {
    toast.success(`${capitalize(props.pokemon.name)} added to Pokedex!`, {
      autoClose: 2000,
      position: "bottom-right",
    });
  } else {
    toast.error(`${capitalize(props.pokemon.name)} removed from Pokedex!`, {
      autoClose: 2000,
      position: "bottom-right",
    });
  }
};

const seeDetails = () => {
  router.push("/details");
};

const typeBgCardColors = {
  fire: "bg-red-300 text-black ",
  water: "bg-blue-300",
  grass: "bg-green-300",
  electric: "bg-yellow-300",
  poison: "bg-purple-300",
  normal: "bg-gray-300",
  fighting: "bg-red-300",
  flying: "bg-indigo-300",
  ground: "bg-yellow-300",
  rock: "bg-gray-300",
  bug: "bg-lime-300",
  ghost: "bg-indigo-300",
  steel: "bg-gray-300",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-300",
  dark: "bg-gray-300",
  fairy: "bg-pink-300",
  psychic: "bg-pink-300",
};

const typeBgImageColors = {
  fire: "bg-red-100",
  water: "bg-blue-100",
  grass: "bg-green-100",
  electric: "bg-yellow-100",
  poison: "bg-purple-100",
  normal: "bg-gray-100",
  fighting: "bg-red-100",
  flying: "bg-indigo-100",
  ground: "bg-yellow-100",
  rock: "bg-gray-100",
  bug: "bg-lime-100",
  ghost: "bg-indigo-100",
  steel: "bg-gray-100",
  ice: "bg-cyan-100",
  dragon: "bg-indigo-100",
  dark: "bg-gray-100",
  fairy: "bg-pink-100",
  psychic: "bg-pink-100",
};

const typeTagColors = {
  fire: "bg-red-800 text-white rounded-xl",
  water: "bg-blue-800 text-white rounded-xl",
  grass: "bg-green-800 text-white rounded-xl",
  electric: "bg-yellow-800 text-white rounded-xl",
  poison: "bg-purple-800 text-white rounded-xl",
  normal: "bg-gray-800 text-white rounded-xl",
  fighting: "bg-red-800 text-white rounded-xl",
  flying: "bg-indigo-800 text-white rounded-xl",
  ground: "bg-yellow-800 text-white rounded-xl",
  rock: "bg-gray-800 text-white rounded-xl",
  bug: "bg-lime-800 text-white rounded-xl",
  ghost: "bg-indigo-800 text-white rounded-xl",
  steel: "bg-gray-800 text-white rounded-xl",
  ice: "bg-cyan-800 text-white rounded-xl",
  dragon: "bg-indigo-800 text-white rounded-xl",
  dark: "bg-gray-800 text-white rounded-xl",
  fairy: "bg-pink-800 text-white rounded-xl",
  psychic: "bg-pink-800 text-white rounded-xl",
};

const getTypeClass = (typeName) => {
  return typeTagColors[typeName];
};

const getTypeBgImage = (pokemon) => {
  if (pokemon.types && pokemon.types.length > 0) {
    const firstType = pokemon.types[0].type.name;
    return typeBgImageColors[firstType];
  }
};

const getCardBackground = (pokemon) => {
  if (pokemon.types && pokemon.types.length > 0) {
    const firstType = pokemon.types[0].type.name;
    return typeBgCardColors[firstType];
  }
};
</script>

<template>
  <article
    :class="[
      getCardBackground(pokemon),
      'w-62 p-4 border rounded-xl shadow hover:shadow-lg transition relative',
    ]"
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
        :aria-label="
          props.inPokedex ? 'Retirer du Pokedex' : 'Ajouter au Pokedex'
        "
        role="button"
      ></i>
    </div>

    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      aria-hidden="true"
      :class="[
        getTypeBgImage(pokemon),
        'w-full h-auto mb-2 border border-b rounded-xl',
      ]"
    />

    <h2 class="text-lg font-press font-semibold text-center mb-2">
      {{ capitalize(pokemon.name) }}
    </h2>

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
      <span>{{ pokemon.height / 10 }} meters</span>
      <span>{{ pokemon.weight / 10 }} kg</span>
    </div>

    <div class="flex flex-col gap-2 items-center">
      <button
        @click="seeDetails"
        class="text-xs border border-gray-500 bg-gray-300 px-4 py-2 text-black rounded hover:bg-green-600 transition hover:cursor-pointer"
      >
        See details <i class="pi pi-info-circle"></i>
      </button>
      <div>
        <router-link
          :to="{ name: 'details', params: { pokemonName: pokemon.name } }"
          class="text-blue-800 hover:underline"
        >
          Details
        </router-link>
      </div>
    </div>
  </article>
</template>
