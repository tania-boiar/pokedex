import { client } from './fetchClient';
import { Pokemon } from '../types/Pokemon';

type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export const getCards = (limit: number = 12, offset: number = 0) => {
  return client.get<PokemonList>(`pokemon/?limit=${limit}&offset=${offset}`);
}; 