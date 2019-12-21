import { EXAMPLE } from "./actions";

const initialState = {
  text: '',
};

export const example = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE: 
      return {
        ...state,
        text: action.payload.text,
      };

    default:
      return state;
  }
};  