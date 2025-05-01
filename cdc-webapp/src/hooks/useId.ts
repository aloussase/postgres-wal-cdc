export const useId = () => {
  let counter = 0;

  return {
    createId: () => {
      counter += 1;
      return counter;
    },
  };
};
