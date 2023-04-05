import { ErrorMessages } from '../../types/ErrorMessages';
import { PokemonDetails } from '../../types/PokemonDetails';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../Loader';
import { PokemonCard } from '../PokemonCard';
import './PokemonList.scss';

type Props = {
  pokemons: PokemonDetails[];
  isError: boolean;
  isLoading: boolean;
}

export const PokemonList: React.FC<Props> = ({
  pokemons,
  isError,
  isLoading
}) => {
  const showNoPokemons = !pokemons.length && !isError && !isLoading;
  const showPokemonsCards = !!pokemons.length && !isLoading;

  return (
    <div className="pokemons-list">
      {!pokemons.length && isError && (
        <ErrorMessage text={ErrorMessages.OnLoad} />
      )}

      {showNoPokemons && <ErrorMessage text={ErrorMessages.OnEmptyData} />}

      <div className="row gy-4 pokemons-items">
        {showPokemonsCards
        && pokemons.map((pokemon: PokemonDetails) => <PokemonCard pokemon={pokemon} key={pokemon.id}/>)}

        {isLoading && <Loader />}
      </div>
      
    </div>
);
}

PokemonList.displayName = 'ProductList';
