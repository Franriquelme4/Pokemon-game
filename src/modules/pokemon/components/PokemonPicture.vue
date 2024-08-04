import { computed } from 'vue';
<template>
  <section>
    <img v-if="!props.showPokemon" class="fade-in brightness-0" :src="pokemonImg" alt="" />
    <img v-else :src="pokemonImg" class="fade-in" alt="pokemon image" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImg = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
);
</script>

<style scoped>
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
