
import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layout/RootLayOut";
import AirbnbListingForm from "../Components/AddPackage/AirbnbPackage";
import Home from "../HomePAge/Home";
import PackageDetail from "../Components/ShowPackge/PackageDetails";
import PackageListings from "../Components/ShowPackge/PackageListings";





export  const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayOut></RootLayOut>,
    children:[
        {
            index:true ,
            element:<Home></Home>
        },
        {
          path:'/addPakage',
          element:<AirbnbListingForm></AirbnbListingForm>
        },
        {
          path:'/showPackage',
          element:<PackageListings/>
        },
        {
          path:'/packages/:id',
          element:<PackageDetail/>
        }
    ]
  },
]);
