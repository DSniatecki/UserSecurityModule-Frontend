import {securityActionTypes} from "../actions/securityActions";

const initialState = {
    isSignUpModalOpen: false,

};


const securityReducer = (state = initialState, action) =>{
    switch(action.type){
        case securityActionTypes.CHANGE_SIGN_UP_MODAL_VISIBILITY:
            return{
                ...state,
                isSignUpModalOpen: !state.isSignUpModalOpen
            };
        default:
            return state;
    }
};

export default securityReducer;
