import { memo } from 'react';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  text: string;
};

export const ErrorMessage: React.FC<Props> = memo(({ text }) => (
  <>
    <h2 className="heading-2">{text}</h2>

    {text === ErrorMessages.OnLoad && (
      <button
        className="button"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    )}

  </>
));

ErrorMessage.displayName = 'ErrorMessage';
