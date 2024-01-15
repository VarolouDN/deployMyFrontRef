
export const setUsersActionCreator=(payload)=>{

    return {

        type:"SET_USERS",
        payload


    }

}


export const getUsersActionCreatorThunk=()=>(dispatch)=>{




    fetch("https:deploy-my-back.vercel.app/api/user/users")
        .then(response=>response.json()).then(data=>{


            dispatch(setUsersActionCreator(data))
            console.log(data)

        }).catch(e=>console.log(e))



}