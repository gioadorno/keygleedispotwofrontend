import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateUser from './Components/EmployeeHome/Users/CreateUser/CreateUser'
import GuestLogin from "./Components/routes/GuestLogin/GuestLogin";
import BuyerDashboard from "./Components/Buyer/BuyerDashboard";
import Homepage from "./Components/routes/Public/Homepage";
import Careers from "./Components/routes/Public/Careers/Careers";  
import CreateAccount from "./Components/routes/CreateBuyer/CreateAccount";
import Dashboard from "./Components/EmployeeHome/Dashboard";
import Acquisitions from './Components/EmployeeHome/Acquisitions/Acquisitions';
import PropertyDetails from "./Components/EmployeeHome/Acquisitions/Property/PropertyDetails/PropertyDetails";
import AcqOptions from "./Components/EmployeeHome/Acquisitions/Forms/AcqOptions";
import AcqPaperwork from "./Components/EmployeeHome/Acquisitions/Forms/AcqPaperwork";
import DispoPaperwork from "./Components/EmployeeHome/Acquisitions/Forms/DispoPaperwork";
import Map from "./Components/EmployeeHome/Map/Map";
import Profile from './Components/EmployeeHome/Profile/Profile';
import Employees from "./Components/EmployeeHome/Users/Employees";
import Login from "./Components/Login/Login";
import OutboundCallsFull from "./Components/EmployeeHome/Reports/OutboundCallsFull";
import Opportunities from "./Components/EmployeeHome/Reports/Opportunities";
import NotAuthorized from './Components/EmployeeHome/NotAuthorized';
import SubmitProperty from "./Components/routes/Public/SubmitProperty/SubmitProperty";
import Offer from "./Components/Buyer/Offer";
import BuyerProfile from './Components/Buyer/BuyerProfile/BuyerProfile';
import PropertyMap from "./Components/Buyer/PropertyMap";
import EventCalendar from "./Components/EmployeeHome/EventCalendar/EventCalendar";
import DealText from "./Components/EmployeeHome/Acquisitions/Property/DealText";
import HR from './Components/EmployeeHome/HR/HR';
import PostJob from './Components/EmployeeHome/HR/PostJob/PostJob';
import Applications from './Components/EmployeeHome/HR/Applications/Applications';
import ITDashboard from './Components/EmployeeHome/IT/ITDashboard';
import Support from './Components/routes/Support/Support';
import ResetPassword from './Components/routes/GuestLogin/ResetPassword';
import ResetEmployeePassword from './Components/Login/ResetEmployeePassword';
import PayoutData from './Components/EmployeeHome/HR/PayoutData/PayoutData';
import Videos from './Components/EmployeeHome/Onboarding/Videos';
import RemovePayouts from './Components/EmployeeHome/HR/RemovePayouts/RemovePayouts';
import YearPayout from './Components/EmployeeHome/HR/YearPayout/YearPayout';
import Inventory from './Components/EmployeeHome/Inventory/Inventory';


const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    {/* Home */}
                    <Route path='/' exact element={<Homepage />} />

                    {/* Support */}
                    <Route path='/support' exact element={<Support />} />

                    {/* Reset Password */}
                    <Route path='/forgotpassword/:token' exact element={<ResetPassword />} />

                    {/* Employee Login */}
                    <Route path='/user/login' exact element={<Login />} />

                    <Route path='/employeedashboard' exact element={<Dashboard />} />
                    <Route path='/acquisitions' exact element={<Acquisitions />} />
                    <Route path='/acquisitions/:id' exact element={<PropertyDetails />} />
                    <Route path='/profile/:id' exact element={<Profile />} />
                    <Route path='/acquisitions/search' exact element={<Acquisitions />} />

                    {/* Employee Reset Password */}
                    <Route path ='/user/resetpassword/:token' exact element={<ResetEmployeePassword />} />

                    {/* <Route path='/acqTable/:id' exact element={<AcqDetails />} /> */}
                    <Route path='/map' exact element={<Map />} />
                    <Route path='/buyerlogin' exact element={<GuestLogin />} />
                    <Route path='/createaccount' exact element={<CreateAccount />} />
                    {/* <Route path='/guestmap' exact element={<GuestMap />} /> */}

                    {/* Buyer Dashboard */}
                    <Route path='/dashboard' exact element={<BuyerDashboard />} />
                    <Route path='/dashboard/:id' exact element={<Offer />} />
                    <Route path='/dashboard/search' exact element={<BuyerDashboard />} />

                    {/* Buyer Map */}
                    <Route path='/propertymap' exact element={<PropertyMap />} />

                    {/* Buyer Profile */}
                    <Route path='/buyerprofile/:id' exact element={<BuyerProfile />} />

                    <Route path='/careers' exact element={<Careers />} />
                    {/* <Route path='/warehouse' exact element={<Warehouse />} /> */}
                    <Route path='/acqoptions' exact element={<AcqOptions />} />
                    <Route path='/acqpaperwork' exact element={<AcqPaperwork />} />
                    <Route path='/dispopaperwork' exact element={<DispoPaperwork />} />
                    <Route path='/users' exact element={<Employees />} />

                    {/* Inventory */}
                    <Route path='/inventory' exact element={<Inventory />} />

                    {/* Event Calendar */}
                    <Route path='/eventcalendar' exact element={<EventCalendar />} />

                    {/* Deal Text */}
                    <Route path='/dealtext/:id' exact element={<DealText />} />

                    {/* Onboarding */}
                    <Route path='/onboarding/videos' exact element={<Videos />} />

                    {/* HR */}
                    <Route path='/hr' exact element={<HR />} />
                    <Route path='/hr/postjob' exact element={<PostJob />} />
                    <Route path='/hr/applications' exact element={<Applications />} />
                    <Route path='/hr/payoutdata' exact element={<PayoutData />} />
                    <Route path='/hr/removepayouts' exact element={<RemovePayouts />} />
                    <Route path='/hr/yearpayout' exact element={<YearPayout />} />

                    {/* IT Dashboard */}
                    <Route path='/itdashboard' exact element={<ITDashboard />} />


                    {/* Reports */}
                    <Route path='/callreports' exact element={<OutboundCallsFull />} />
                    <Route path='/opportunityreports' exact element={<Opportunities />} />
                    <Route path='/opportunityreports/:status' exact element={<Opportunities />} />
                    <Route path='/notauthorized' exact element={<NotAuthorized />} />
                    <Route path='/submitproperty' exact element={<SubmitProperty />} />

                    {/* Create User */}
                    <Route path='/createuser' exact element={<CreateUser />} />
                </Routes>
            </Router>
        </>
    )
}




export default App
