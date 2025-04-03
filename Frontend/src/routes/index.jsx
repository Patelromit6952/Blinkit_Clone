import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import { Home } from '../pages/Home.jsx'
import Searchpage from '../pages/Searchpage.jsx'
import Login from '../pages/Login.jsx'
import { Register } from '../pages/Register.jsx'
import Forgotpasswordotp from '../pages/Forgotpasswordotp.jsx'
import Verifyotp from '../pages/Verifyotp.jsx'
import Resetpassword from '../pages/Resetpassword.jsx'
import UserMenuMobile from '../pages/UserMenuMobile.jsx'
import Dashboard from '../layouts/Dashboard.jsx'
import Profile from '../pages/Profile.jsx'
import Myorders from '../pages/Myorders.jsx'
import Address from '../pages/Address.jsx'
import Products from '../pages/Products.jsx'
import { Uploadproduct } from '../pages/Uploadproduct.jsx'
import Category from '../pages/Category.jsx'
import Subcategory from '../pages/Subcategory.jsx'
import Adminpermission from '../layouts/Adminpermission.jsx'
import Productlistpaage from '../pages/Productlistpaage.jsx'
import ProductDisplaypage from '../pages/ProductDisplaypage.jsx'
import CartMobile from '../pages/CartMobile.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import Success from '../pages/Success.jsx'
import Cancel from '../pages/Cancel.jsx'

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"search",
                element:<Searchpage/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgotpassword",
                element:<Forgotpasswordotp/>
            },
            {
                path:"verifyotp",
                element:<Verifyotp/>
            },{
                path:"resetpassword",
                element:<Resetpassword/>
            },{
                path:"user",
                element:<UserMenuMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },{
                        path:"myorders",
                        element:<Myorders/>
                    },{
                        path:"address",
                        element:<Address/>
                    },{
                        path:"products",
                        element:<Adminpermission><Products/></Adminpermission>
                    },{
                        path:"uploadproducts",
                        element:<Adminpermission><Uploadproduct/></Adminpermission>
                    },{
                        path:"category",
                        element: <Adminpermission><Category/></Adminpermission>
                    },{
                        path:"subcategory",
                        element:<Adminpermission><Subcategory/></Adminpermission>
                    }
                ]
            },
            {
                path:":category",
                children : [
                    {
                        path:":subcategory",
                        element:<Productlistpaage/>
                    },

                ]
            },
            {
                path:"product/:product",
                element:<ProductDisplaypage/>
            },
            {
                path:"Cart",
                element:<CartMobile/>
            },
            {
                path:"checkout",
                element:<CheckoutPage/>
            },{
                path:"success",
                element:<Success/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            }
        ]
    }
])

export default router