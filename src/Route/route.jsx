
import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layout/RootLayOut";
import AirbnbListingForm from "../Components/AddPackage/AirbnbPackage";
import Home from "../HomePAge/Home";
import PackageListings from "../Components/AddPackage/PackageListings";
import PackageDetail from "../Components/AddPackage/PackageDetails";





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
          element:<PackageListings></PackageListings>
        },
        {
          path:'/packages/:id',
          element:<PackageDetail></PackageDetail>
        }
    ]
  },
]);
