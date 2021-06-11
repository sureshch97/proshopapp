import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productReducers,
    productDetailReducers,
    deleteProductReducer,
    createProductReducer,
    UpdateproductReducer,
    productcreateReviewReducer,
    TopProductsReducer
} from './reducers/productReducers'
import {
    userLoginReducer,
    userRigesterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer, deleteUserReducer,
    UpdateuserReducer
} from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer, orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,

} from './reducers/Orderreducer'


const reducer = combineReducers({
    productList: productReducers,
    productDetails: productDetailReducers,
    productcreateReview: productcreateReviewReducer,
    TopProducts: TopProductsReducer,
    deleteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    Updateproduct: UpdateproductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRigester: userRigesterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    Updateuser: UpdateuserReducer,
    deleteUser: deleteUserReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    },
    userRigester: {
        userInfo: userInfoFromStorage
    },
    userDetails: {
        user: userInfoFromStorage
    },
    userUpdateProfile: {
        user: userInfoFromStorage
    }
}
const middleware = [thunk];

const store = createStore(

    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store