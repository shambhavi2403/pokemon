 // src/components/PokemonCard.js
import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  // Extracting the ID from the URL using regex
  const match = pokemon.url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={pokemon.name}
      />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default PokemonCard;

