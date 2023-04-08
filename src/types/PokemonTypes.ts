import { PokemonType } from "./PokemonType";

export interface PokemonTypes {
  count: number;
  next: null | number;
  previous: null | number;
  results: PokemonType[];
}
