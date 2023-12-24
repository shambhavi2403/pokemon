 
// src/components/PokemonList.js
import React, { useRef, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemonList, onPokemonClick, onIntersection }) => {
  const lastPokemonRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (lastPokemonRef.current) {
      observer.observe(lastPokemonRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersection]);

  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onClick={onPokemonClick}
            ref={index === pokemonList.length - 1 ? lastPokemonRef : null}
          />
        );
      })}
    </div>
  );
};

export default PokemonList;
