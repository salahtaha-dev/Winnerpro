// module pour faire le lien entre la base de données et le front
import axios from "axios";

export const GET_PARIS = "GET_PARIS";
export const PARIER_PARI = "PARIER_PARI";

export const getParis = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/pari/`)
      .then((res) => {
        dispatch({ type: GET_PARIS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// fonction de création de pari
export const parier_pariactions = (
  pari_id,
  user_id,
  ducats_paries,
  reponse_pari
) => {
  //console.log("pari action :  choix = " + reponse_pari);
  return async (dispatch) => {
    return await axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/pari/parier/paristars/` + pari_id,
      data: { ducats_paries: ducats_paries, id: user_id, choix: reponse_pari },
    })
      .then((res) => {
        dispatch({
          type: PARIER_PARI,
          payload: { pari_id, user_id, reponse_pari,  ducats_paries},
        });
      })
      .catch((err) => console.log(err));
  };
};
