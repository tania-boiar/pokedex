import { client } from './fetchClient';
import { PokemonTypes } from '../types/PokemonTypes';

export const getTypes = () => {
  return client.get<PokemonTypes>('type');
};
