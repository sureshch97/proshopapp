import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_lOGIN_FAIL, USER_LOGIN_REQUEST, USER_lOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_lOGIN_SUCCESS, USER_LOGOUT, USER_lOGOUT, USER_RIGESTER_FAIL, USER_RIGESTER_REQUEST, USER_RIGESTER_SUCCESS, USER_UPDATED_PROFILE_FAIL, USER_UPDATED_PROFILE_SUCCESS, USER_UPDATED__PROFILE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/userConstants'


export const Login = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            console.log(message)
    if (message === 'Not authorized, token failed') {
        dispatch(logout())
    }
    dispatch({
        type: USER_LOGIN_FAIL,
        payload: message,
    })


    }
};

//user rigester

export const register = (name, email, password) => async (dispatch) => {

    try {

        dispatch({
            type: USER_RIGESTER_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_RIGESTER_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            console.log(message)
    if (message === 'Not authorized, token failed') {
        dispatch(logout())
    }
    dispatch({
        type: USER_RIGESTER_FAIL,
        payload: message,
    })

    }

};


export const getuserDetails = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }


        const { data } = await axios.post(`/api/users${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });


    } catch (error) {
       
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })

    }

};

// UPDATE USER PROFILE

export const UpdateuserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }


        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({
            type:USER_UPDATE_PROFILE_RESET
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
       
        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })

    }

};

//user List
export const Listusers = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_LIST_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {

                Authorization: `Bearer ${userInfo.token}`

            }
        }

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

};

//USer Logout
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");

    localStorage.removeItem("cartItems");

    localStorage.removeItem("shippingAddress");

    localStorage.removeItem("paymentMethod");

    dispatch({ type: USER_LOGOUT });

    dispatch({ type: USER_DETAILS_RESET });

    dispatch({ type: ORDER_LIST_MY_RESET });

    dispatch({ type: USER_LIST_RESET });

    document.location.href = "/login";


}


//DELETE USER

export const deleteuser = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {

                Authorization: `Bearer ${userInfo.token}`

            }
        }

        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: USER_DELETE_SUCCESS,

        })
    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

};




export const edituserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }


        const { data } = await axios.put(`/api/users/${user._id}`, user, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
        dispatch({ type: USER_DETAILS_RESET })
    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }

};


//getuser detailsl 

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

       
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}



//updated user profile

export const getUpdatedUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATED__PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users/profile`, config)

        dispatch({
            type: USER_UPDATED_PROFILE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATED_PROFILE_FAIL,
            payload: message,
        })
    }
}