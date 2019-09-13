
export const securityActionTypes ={
    AUTHENTICATE_USER: 'AUTHENTICATE_USER',
    LOGOUT_USER: 'LOGOUT_USER'
};

export const authenticateUser = (receivedSecurityToken, username) =>({
    type: securityActionTypes.AUTHENTICATE_USER,
    securityToken: receivedSecurityToken,
    username: username
});

export const logoutUser = () =>({
    type: securityActionTypes.LOGOUT_USER,
});

// MIDDLEWARE
// export const handlePageChange = (pageNumber)=>{
//     return (dispatch, getState) =>{
//         dispatch(changePageNumber(pageNumber));
//         const filters = getState().users.filters;
//         const path = `
//         axios.get(``).then((response) => {
//             dispatch(updateAuctionList(response.data.content))
//         });
//     }
// };


