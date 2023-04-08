import { PokemonList } from '../types/PokemonList';
import { client } from './fetchClient';

export const getCards = (limit: number = 12, offset: number = 0) => {
  return client.get<PokemonList>(`pokemon/?limit=${limit}&offset=${offset}`);
}; 