import { GET_PARIS, PARIER_PARI } from "../actions/pari.actions";
const initialState = {};

export default function pariReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARIS:
      return action.payload;
    case PARIER_PARI:
      return state.map((pari) => {
        if (pari._id === action.payload.pari_id) {
          return {
            ...pari,
            choix: [action.payload.reponse_pari, ...pari.choix],
            participants: [action.payload.user_id, ...pari.participants],
            montants: [action.payload.ducats_paries, ...pari.montants],
          };
        }
        return pari;
      });
    default:
      return state;
  }
}
