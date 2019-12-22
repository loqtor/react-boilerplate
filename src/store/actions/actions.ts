export const EXAMPLE = 'EXAMPLE';

export const exampleAction = (text: string) => {
  return {
    type: EXAMPLE,
    text,
  };
};