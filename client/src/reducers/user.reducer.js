import { GET_USER, USER_PARIER_PARI } from "../actions/user.actions";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case USER_PARIER_PARI:
      //console.log("ducats = " + state.ducats);
      const ducats_prov = state.ducats;
      return {
        ...state,
        ducats: ducats_prov - action.payload.ducats_paries,
      };
    default:
      return state;
  }
}
