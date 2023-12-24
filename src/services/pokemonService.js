// src/services/pokemonService.js
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: {
        offset,
        limit,
      },
    });

    // Ensure the response structure includes the 'types' property
    const dataWithTypes = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await getPokemonDetails(pokemon.name);
        return {
          ...pokemon,
          types: details.types,
        };
      })
    );

    return dataWithTypes;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};
