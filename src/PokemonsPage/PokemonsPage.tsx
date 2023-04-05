import React, { useEffect, useState } from 'react';
import { getCards } from '../api/fetchList';
import { PokemonList } from '../components/PokemonList';
import { getDetails } from '../api/fetchDetails';
import { PokemonDetails } from '../types/PokemonDetails';
import './PokemonsPage.scss';

export const PokemonsPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [limit] = useState<number>(12);
  const [offset, setOffset] = useState<number>(0)
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const loadCards = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const pokemonsFromServer = await getCards(
        limit,
        offset
      );

      const pokemonsDetails = await Promise.all(pokemonsFromServer.results.map(async (pokemon) => {
        const pokemonDetail = await getDetails(pokemon.url);

        return pokemonDetail;
      }));
        

      setPokemons((prevPokemons: PokemonDetails[]) => {
        return [...prevPokemons, ...pokemonsDetails]
      });

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, [limit, offset]);


  const handleCardsOffset = () => {
    setOffset(prevOffset => prevOffset + limit)
  }

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
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12">
            <PokemonList pokemons={pokemons} isError={isError} isLoading={isLoading} />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-14 col-sm-12"></div>
        </div>
        {!isLoading && !isError && !!pokemons.length &&
          <button
            className="button col-xl-8 col-lg-8 col-md-10 col-sm-12"
            onClick={handleCardsOffset}>
              Load more
          </button>
        }
      </div>

    </div>
  );
};
