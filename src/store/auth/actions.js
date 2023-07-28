
export const LOGIN = "LOGIN"


export const loginUser = (user, authToken) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: { user, authToken }
    })
}


