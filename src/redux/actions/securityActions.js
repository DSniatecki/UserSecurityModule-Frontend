// import axios from "axios";

export const securityActionTypes ={
    CHANGE_SIGN_UP_MODAL_VISIBILITY: 'CHANGE_SIGN_UP_MODAL_VISIBILITY'
};

export const changeUserSignUpModalVisibility = () =>({
    type: securityActionTypes.CHANGE_SIGN_UP_MODAL_VISIBILITY
});


// export const handlePageChange = (pageNumber)=>{
//     return (dispatch, getState) =>{
//         dispatch(changePageNumber(pageNumber));
//         const filters = getState().auction.filters;
//         const path = `
//         axios.get(``).then((response) => {
//             dispatch(updateAuctionList(response.data.content))
//         });
//     }
// };


