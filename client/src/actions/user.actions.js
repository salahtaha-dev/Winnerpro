import axios from "axios";

export const GET_USER = "GET_USER";
export const USER_PARIER_PARI = "USER_PARIER_PARI";

//Récupération des users
export const getUser = (uid) => {
  return async (dispatch) => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const parier_useractions = (pari_id, user_id, ducats_paries) => {
  return (dispatch) => {
    dispatch({
      type: USER_PARIER_PARI,
      payload: { pari_id, user_id, ducats_paries },
    });
    //TODO : ADD A CATCH
  };
};
