import { useEffect, useState } from 'react';
import './Filtering.scss';
import { getTypes } from '../../api/fetchTypes';
import { PokemonType } from '../../types/PokemonType';

type Props = {
  setIsLoading: (arg: boolean) => void;
  setIsError: (arg: boolean) => void;
  setTypeId: (arg: string) => void;
}

export const Filtering: React.FC<Props> = ({setIsLoading, setIsError, setTypeId}) => {
  const [types, setTypes] = useState<PokemonType[]>([]);

  const loadTypes = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const typesFromServer = await getTypes();

      setTypes(typesFromServer.results);

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const hanldeTypeFiltering = (value: string) => {
    setTypeId(value);
  }

  return (
    <>
      <label htmlFor="type-select" className="select-title">
        Choose Pokemon type
      </label>
      
      <select
        className="form-select col-4"
        id="type-select"
        onChange={event => hanldeTypeFiltering(event.target.value)}
      >
        <option
          selected
          value="all"
          className="filter-option"
        >
          All types
        </option>
        
        {types.map((type: PokemonType) => {
          const parts = type.url.split('/');
          const typeNumber = parts[parts.length - 2];
          const formattedName = type.name.charAt(0).toUpperCase() + type.name.slice(1)

          return (
            <option
              key={typeNumber}
              value={typeNumber}
              className="filter-option"
            >
              {formattedName}
            </option>
            )
        })}
      </select>
    </>
);
}

Filtering.displayName = 'Filtering';
