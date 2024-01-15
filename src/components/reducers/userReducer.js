const defaultState={

users:[]
}

export default function authReducer(state=defaultState,action){

    switch(action.type) {

        case "SET_USERS":

            return {...state, users: action.payload}


        default:
            return state

    }
}