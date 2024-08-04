<template>
  <section v-if="isloading" class="flex flex-col justify-center items-center x-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemon</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center x-screen h-screen">
    <h1 class="m-2">Quien es este pokemon ?</h1>
    <div class="h-20" v-if="gameStatus != GameStatus.PLAYING">
      <button @click="getNextRound(4)">Jugar de Nuevo</button>
    </div>

    <!-- Pokemon picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon?.id"
      :show-pokemon="gameStatus != GameStatus.PLAYING"
    />
    <!-- Pokemon Options -->
    <PokemonOptions
      :options="pokemonOptions"
      :block-selection="gameStatus != GameStatus.PLAYING"
      :pokemon-win="randomPokemon?.id"
      @selected-options="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces/game-status.enum.ts';

const { isloading, gameStatus, randomPokemon, pokemonOptions, checkAnswer, getNextRound } =
  usePokemonGame();
</script>
