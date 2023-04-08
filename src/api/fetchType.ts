import { PokemonListByType } from '../types/PokemonListByType';
import { client } from './fetchClient';

export const getType = (id: string) => {
  return client.get<PokemonListByType>(`type/${id}`);
};
