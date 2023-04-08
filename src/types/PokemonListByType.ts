import { PokemonByType } from "./PokemonByType";

export interface PokemonListByType {
  damage_relations: any;
  game_indices: any;
  generation: any;
  id: number;
  move_damage_class: any;
  moves: any;
  name: string;
  names: any;
  past_damage_relations: any;
  pokemon: PokemonByType[];
};

