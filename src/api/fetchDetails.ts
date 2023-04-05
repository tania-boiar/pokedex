import { PokemonDetails } from '../types/PokemonDetails';
import { BASE_URL, client } from './fetchClient';


export const getDetails = (url: string) => {
  const endpoint = url.replace(BASE_URL, '');
  return client.get<PokemonDetails>(endpoint);
}; 