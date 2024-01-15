const defaultState={
    currentUser:{},
    isAuth:false

}

export default function authReducer(state=defaultState,action){

    switch(action.type) {

        case "SET_CURRENT":

            return {...state,currentUser: action.payload,isAuth: true};

      /*  case "SET_AUTH":

            return {...state,isAuth:true};*/
        case "LOG_OUT":
            localStorage.removeItem('token')
            return {...state,isAuth: false}

        default:
            return state

    }
}