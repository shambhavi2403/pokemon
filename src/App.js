// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonDetailModal from './components/PokemonDetailModal';
import { getPokemonList, getPokemonDetails } from './services/pokemonService';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const observer = useRef();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const data = await getPokemonList(offset, limit);

        const uniquePokemonList = data.filter(
          (pokemon) => !pokemonList.some((existingPokemon) => existingPokemon.name === pokemon.name)
        );

        setPokemonList((prevList) => [...prevList, ...uniquePokemonList]);
        setOffset((prevOffset) => prevOffset + limit);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset, limit, pokemonList]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setOffset(0);
  };

  const handlePokemonClick = async (pokemon) => {
    try {
      const details = await getPokemonDetails(pokemon.name);
      setSelectedPokemon(details);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const closeModal = (event) => {
    if (event.target.classList.contains('modal')) {
      setSelectedPokemon(null);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setLimit((prevLimit) => prevLimit + 20);
    }
  };

  const lastPokemonRef = useRef();

  useEffect(() => {
    if (lastPokemonRef.current) {
      observer.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      });
      observer.current.observe(lastPokemonRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleObserver]);

  const filteredPokemonList = pokemonList
    .filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((pokemon) =>
      !selectedType ||
      (Array.isArray(pokemon.types) && pokemon.types.some(({ type: { name } }) => name === selectedType))
    );

  return (
    <div className="container">
      <h1>Pokedex App</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
      {/* Add other filters or components as needed */}
      <PokemonList
        pokemonList={filteredPokemonList}
        onPokemonClick={handlePokemonClick}
        onIntersection={handleObserver}
      />
      {loading && <p>Loading...</p>}
      {selectedPokemon && (
        <PokemonDetailModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}

export default App;
