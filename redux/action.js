import { FETECHED_ALL_PHARMACY } from "../constants/ActionTypes";
import axios from "axios";

export const someAction = () => ({
  getPharmacyList,
});

export function getPharmacyList(page) {
  let URL = `https://www.maiia.com/api/pat-public/hcd?limit=500&locality=75001-PARIS&page=${page}&speciality.shortName=pharmacie`;
  return (dispatch) => {
    axios
      .get(URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: FETECHED_ALL_PHARMACY, payload: res.data });
      })
      .catch((err) => {
        console.log("erreur", err.response);
      });
  };
}
