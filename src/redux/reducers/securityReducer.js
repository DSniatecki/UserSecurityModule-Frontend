import {securityActionTypes} from "../actions/securityActions";

const initialState = {
    isUserAuthenticated: false,
    securityToken: '',
    username: '',
};


const securityReducer = (state = initialState, action) =>{
    switch(action.type){
        case securityActionTypes.AUTHENTICATE_USER:
            return{
                ...state,
                isUserAuthenticated: true,
                securityToken: action.securityToken,
                username: action.username
            };
        case securityActionTypes.LOGOUT_USER:
            return{
                ...state,
                isUserAuthenticated: false,
                securityToken: ''
            };
        default:
            return state;
    }
};

export default securityReducer;
