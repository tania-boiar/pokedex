import { ErrorMessages } from '../../types/ErrorMessages';
import { PokemonDetails } from '../../types/PokemonDetails';
import { ErrorMessage } from '../ErrorMessage';
import { PokemonCard } from '../PokemonCard';
import './PokemonList.scss';

type Props = {
  pokemons: PokemonDetails[];
  isError: boolean;
  isLoading: boolean;
  setPokemon: (arg: PokemonDetails) => void;
}

export const PokemonList: React.FC<Props> = ({
  pokemons,
  isError,
  isLoading,
  setPokemon
}) => {
  const showNoPokemons = !pokemons.length && !isError && !isLoading;
  const showPokemonsCards = !!pokemons.length && !isLoading && !isError;

  return (
    <div className="pokemons-list">
      {isError && !isLoading && (
        <ErrorMessage text={ErrorMessages.OnLoad} />
      )}

      {showNoPokemons && <ErrorMessage text={ErrorMessages.OnEmptyData} />}

      <div className="row gy-4 pokemons-items justify-content-center">
        {showPokemonsCards
          && pokemons.map((pokemon: PokemonDetails) => {
            return (<PokemonCard pokemon={pokemon} key={pokemon.id} setPokemon={setPokemon} />)
        })}
      </div>
      
    </div>
);
}

PokemonList.displayName = 'ProductList';
