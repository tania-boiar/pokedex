export const convertName = (name: string) => {
  switch (name) {
    case 'hp':
      return 'HP';
    case 'special-attack':
      return 'SP Attack';
    case 'special-defense':
      return 'SP Defence';
    default:
      return name;
  }
}