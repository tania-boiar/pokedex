import React from 'react';
import './PokemonCard.scss';
import { PokemonDetails } from '../../types/PokemonDetails';
import classNames from 'classnames';

type Props = {
  pokemon: PokemonDetails;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const {name, sprites, types} = pokemon;
  const typeColors = {
    grass: 'green',
    water: 'blue',
    poison: 'brown'
  }
  
  return (
    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8">
      <div className="pokemon-card">
        <img className="pokemon-card_image" src={sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <div className="pokemon-card_descriptions">
          <h3 className="pokemon-card_title">{name}</h3>
          <div className="pokemon-card_types">
            {types.map((type: any) => {
              return (
                <span
                  // className="pokemon-card_type"
                  className={classNames('pokemon-card_type', {})}
                  // style={{ backgroundColor: `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0.6)}` }}
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
