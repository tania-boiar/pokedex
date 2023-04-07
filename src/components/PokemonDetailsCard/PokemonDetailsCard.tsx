import React from 'react';
import './PokemonDetailsCard.scss';
import { PokemonDetails } from '../../types/PokemonDetails';
import { convertName } from '../../helpers/convertStatName';

type Props = {
  pokemon: PokemonDetails;
}

export const PokemonDetailsCard: React.FC<Props> = ({ pokemon }) => {
  const {name, sprites, types, stats, weight, moves} = pokemon;
  
  return (
    <div className="col-xl-12 col-lg-12 col-md-8 col-sm-8">
      <div className="pokemon-details">
        <img className="pokemon-details_image" src={sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <h3 className="pokemon-details_title">{name}</h3>
        <div className="pokemon-details_table">
          {types.map((type: any) => {
            return (
              <div className="pokemon-details_row" key={type.slot}>
                <span>Type</span>
                <span>
                    {type.type.name}
                </span>
              </div>
            )
          })}

            {stats.map((stat: any) => {
              const name = convertName(stat.stat.name);
            
              return (<div className="pokemon-details_row">
                <span>{name}</span>
                <span>{stat.base_stat}</span>
              </div>)
            })}

          <div className="pokemon-details_row">
            <span>Weight</span>
            <span>{weight}</span>
          </div>

          <div className="pokemon-details_row">
            <span>Total Moves</span>
            <span>{moves.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

PokemonDetailsCard.displayName = 'PokemonDetails';
