import React from 'react';
import './PokemonCard.scss';
import { PokemonDetails } from '../../types/PokemonDetails';

type Props = {
  pokemon: PokemonDetails;
  setPokemon: (arg: PokemonDetails) => void;
}

export const PokemonCard: React.FC<Props> = ({ pokemon, setPokemon }) => {
  const {name, sprites, types} = pokemon;
  
  return (
    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8">
      <div className="pokemon-card" onClick={() => setPokemon(pokemon)}>
        <img className="pokemon-card_image" src={sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <div className="pokemon-card_descriptions">
          <h3 className="pokemon-card_title">{name}</h3>
          <div className="pokemon-card_types">
            {types.map((type: any) => {
              return (
                <span
                  className={`pokemon-card_type ${type.type.name}`}
                  key={type.slot}>
                    {type.type.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

PokemonCard.displayName = 'ProductCard';
