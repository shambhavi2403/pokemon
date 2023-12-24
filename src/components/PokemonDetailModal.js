 // src/components/PokemonDetailModal.js
import React from 'react';

const PokemonDetailModal = ({ pokemon, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{pokemon.name}</h2>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
      </div>
    </div>
  );
};

export default PokemonDetailModal;

