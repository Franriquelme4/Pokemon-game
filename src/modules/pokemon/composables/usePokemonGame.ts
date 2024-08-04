import pokemonApi from "../api/pokemonApi";
import { GameStatus } from "../interfaces/game-status.enum";
import { computed, onMounted, ref } from 'vue';
import type { PokemonListResponse } from "../interfaces/pokemon-list.response";
import type { Pokemon } from "../interfaces/pokemon.interface";
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.PLAYING);
    const pokemons = ref<Pokemon[]>([]);

    const pokemonOptions = ref<Pokemon[]>([]);

    const isLoading = computed(() => gameStatus.value.length === 0);

    const randomPokemon = computed(() => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)]);

    const checkAnswer = (id: number) => {
        const hasWon = randomPokemon.value.id === id;
        if (hasWon) {
            gameStatus.value = GameStatus.WON;
            confetti({
                particleCount: 300,
                spread: 150,
                origin: { y: 0.6 }
            });
            return;
        }
        gameStatus.value = GameStatus.LOST;

    }



    const getPokemon = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonArray = response.data.results.map(pokemon => {
            const url = pokemon.url.split('/');
            const id = url.at(-2) ?? 0;
            return {
                id: +id,
                name: pokemon.name
            }
        });
        console.log(pokemonArray);

        return pokemonArray.sort(() => Math.random() - 0.5);
    }

    const getNextRound = (howmany: number = 4) => {
        gameStatus.value = GameStatus.PLAYING;
        pokemonOptions.value = pokemons.value.slice(0, howmany);
        pokemons.value = pokemons.value.slice(howmany);
    }

    onMounted(async () => {
        pokemons.value = await getPokemon();
        getNextRound();
    })

    return {
        gameStatus,
        isLoading,
        getNextRound,
        pokemonOptions,
        randomPokemon,
        checkAnswer
    }
}