import React, { useEffect, useState } from 'react';
import { getCards } from '../../api/fetchList';
import { PokemonList } from '../PokemonList';
import { getDetails } from '../../api/fetchDetails';
import { PokemonDetails } from '../../types/PokemonDetails';
import './PokemonsPage.scss';
import { PokemonDetailsCard } from '../PokemonDetailsCard';
import { Filtering } from '../Filtering';
import { Pokemon } from '../../types/Pokemon';
import { getType } from '../../api/fetchType';
import { Loader } from '../Loader';
import { PokemonByType } from '../../types/PokemonByType';

export const PokemonsPage: React.FC = () => {
  const limit = 12;
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [offset, setOffset] = useState<number>(0)
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [typeId, setTypeId] = useState<string>('all');
  const [pokeAmount, setPokeAmount] = useState<number>(0);

  const loadCards = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const pokemonsFromServer = await getCards(
        limit,
        offset
      );
      setPokemonList(pokemonsFromServer.results);
      setPokeAmount(pokemonsFromServer.count);

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, [limit, offset]);


  const loadDetails =  async () => {
    setIsLoading(true);

    try {
      setIsError(false);

      const pokemonsDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
        const pokemonDetail = await getDetails(pokemon.url);

        return pokemonDetail;
      }));

      setPokemons((prevPokemons: PokemonDetails[]) => {
        return typeId !== 'all'
          ? pokemonsDetails
          : [...prevPokemons, ...pokemonsDetails];
      });

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadDetails();
  }, [pokemonList]);


  const handleCardsOffset = () => {
    setOffset(prevOffset => prevOffset + limit);
  }

  const loadPokemonsByType = async () => {
    if (typeId === 'all' && offset > 0) {  
      setOffset(0);
      setPokemons([]);
      return;
    } else if (typeId === 'all' && offset === 0) {
      setPokemons([]);
      loadCards();
      return;
    }

    setIsLoading(true);

    try {
      setIsError(false);
      
      const typeFromServer = await getType(typeId);
      const pokemonListByType = typeFromServer.pokemon.map((pokemon: PokemonByType) => pokemon.pokemon)

      setPokemonList(pokemonListByType);
      setPokeAmount(pokemonListByType.length)

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemonsByType();
  }, [typeId]);

  const showLoadMoreBtn = pokemons.length < pokeAmount && !isLoading && !isError && !!pokemons.length;

  return (
    <div className="pokemons">
      <div className="container">

        <div className="row">
          <div className="col-12">
            <h1 className="pokemons-title">Pokedex</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row filter-wrap">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
            <Filtering
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              setTypeId={setTypeId}
            />
          </div>
        </div>
      </div>

      <div className="container content-wrap">
        <div className="row gy-4 content-row-wrap">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 ">
            <PokemonList
              pokemons={pokemons}
              isError={isError}
              isLoading={isLoading}
              setPokemon={setPokemon}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 flex-wrap">
            {pokemon && !isLoading && <PokemonDetailsCard pokemon={pokemon} />}
          </div>
        </div>

        {isLoading && <Loader />}

        {showLoadMoreBtn &&
          <button
            className="button col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12"
            onClick={handleCardsOffset}>
            Load more
          </button>
        }
      </div>
    </div>
  );
};
