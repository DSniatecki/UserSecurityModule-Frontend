import axios from "axios";

export const validateNickname = async (rule, value, callback) =>{
   if(value === '' || value === undefined){
       callback('Please input your nickname!')
   }else if( value.length < 4 ){
       callback('Must contain at least 4 characters!')
   }else if( value.length > 20){
       callback('Cannot contain more than 20 characters!')
   }else{
       await remotelyValidateNickname(rule, value, callback);
   }
    callback();
};

export const validateEmail = async (rule, value, callback) =>{
    if(value === '' || value === undefined){
        callback('Please input your E-Mail!')
    }else if( value.length < 4 ){
        callback('Must contain at least 4 characters!')
    }else if( value.length > 80){
        callback('Cannot contain more than 80 characters!')
    }else if( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        callback('Please input valid email!');
    }else {
            await remotelyValidateEmail(rule, value, callback);
    }
    callback();
};


const remotelyValidateNickname = async (rule, value, callback) =>{
    if (value) {
        await axios.get(`/users/check/username/${value}`)
            .then((response) => {
                callback();
            })
            .catch((error) => {
                handleRemoteValidationErrorResponse(error, callback);
            });
        callback();
    } else {
        callback();
    }
};

const remotelyValidateEmail = async (rule, value, callback) =>{
    if (value){
        await axios.get(`/users/check/email/${value}`)
            .then((response) => {
                callback();
            })
            .catch((error) => {
                handleRemoteValidationErrorResponse(error, callback);
            });
    } else {
        callback();
    }
};

const handleRemoteValidationErrorResponse = (error, callback) => {
    if (!error.response) {
        callback();
    }else if (error.response.status === 401 || error.response.status === 400) {
        callback(error.response.data.message);
    }else {
        callback();
    }
};
