export const baseURL = import.meta.env.VITE_API_URL

const summaryapi = {
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'api/user/login',
        method:'post'
    },
    forgotpassword:{
        url:'api/user/forgot-password',
        method:'put',
    },
    verifyotp:{
        url:'api/user/verify-forgot-password-otp',
        method:'put'
    },
    resetpassword:{
        url:'api/user/reset-password',
        method:'put'
    },
    userdetails:{
        url:'api/user/getuserdetails',
        method:'get'
    },
    refreshtoken:{
        url:'/api/user/refresh-token',
        method:'post'
    },
    logout:{
        url:'api/user/logout',
        method:'get'
    },
    uploadavatar:{
        url:'api/user/upload-avatar',
        method:'put'
    },
    updateuser:{
        url:'api/user/update-user',
        method:'put'
    },
    addcategory:{
        url:'api/category/add-category',
        method:'post'
    },
    uploadiamge:{
        url:'api/file/upload',
        method:'post'
    },
    getcategory:{
        url:'api/category/get',
        method:'get'
    },
    updatecategory:{
        url:'api/category/update',
        method:'put'
    },
    deletecategory:{
        url:'api/category/deletecategory',
        method:'delete'
    },
    createsubcategory:{
        url:'api/subcategory/create',
        method:'post'
    },
    getsubcategory:{
        url:'api/subcategory/get',
        method:'post'
    },
    updatesubcategory:{
        url:'api/subcategory/update',
        method:'put'
    },
    deletesubcategory:{
        url:'api/subcategory/delete',
        method:'delete'
    },
    createProduct:{
        url:'api/product/create',
        method:'post'
    },
    getProduct:{
        url:'api/product/get',
        method:'post'
    },
    getProductByCategory:{
        url:'api/product/get-product-by-category',
        method:'post'
    },
    getproductbycategoryandsubcategory:{
        url:'api/product/get-product-by-category-and-subcategory',
        method:'post'
    },
    getProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    updateProductDetails : {
        url : "/api/product/update-product-details",
        method : 'put'
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : 'delete'
    },
    searchProduct : {
        url : '/api/product/search-product',
        method : 'post'
    },
    addTocart : {
        url : "/api/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/update-qty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete-cart-item',
        method : 'delete'
    },
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    }
}

export default summaryapi