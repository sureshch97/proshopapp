import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS
} from '../constants/productConstants'


export const productReducers = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: false,
                products: []

            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,

            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: true,
                products: []

            }



        default:
            return state
    }

};


export const productDetailReducers = (state = { product: { reviews: [] } }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload

            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload

            }
        default:
            return state
    }

};



//DELETE PRODUCT

export const deleteProductReducer = (state = {}, action) => {

    switch (action.type) {

        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,

            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
};



//CREATE PRODUCT

export const createProductReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,

            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {}


        default:
            return state;
    }
};

export const UpdateproductReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,

            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                products: action.payload

            }
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return {

            }

        default:
            return state;
    }
};



export const productcreateReviewReducer = (state = {}, action) => {

    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true

            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: true,
                error: action.payload

            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }

};




export const TopProductsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_TOP_SUCCESS:
            return {
                loading: false,
                products: action.payload

            }
        case PRODUCT_TOP_FAIL:
            return {
                loading: true,
                error: action.payload

            }

        default:
            return state
    }

};

