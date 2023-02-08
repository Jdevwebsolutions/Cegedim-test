import {
  FETECHED_ALL_PHARMACY,
  SELECTED_PHARMACY,
} from "../constants/ActionTypes";
const initialState = {
  remotePharmacyList: [],
  remoteSelectedPharmacy: {},
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETECHED_ALL_PHARMACY:
      return {
        ...state,
        remotePharmacyList: action.payload,
      };

    case SELECTED_PHARMACY:
      return Object.assign({}, state, {
        remoteSelectedPharmacy: action.payload,
      });

    default:
      return state;
  }
};

export default myReducer;
