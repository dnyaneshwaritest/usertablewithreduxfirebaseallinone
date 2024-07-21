import './App.css';
import Login from './Components/Login';
import {Tabs } from 'antd';
import Signup from './Components/Signup';
import RecursiveComponent from './RecursiveComponent';
import TreeComponent from './Components/TreeComponent';
import CheckTreeComponent from './Components/CheckTreeComponent';
import CheckboxComponent from './Components/CheckboxComponent';
import CustomerTable from './Table/CustomerTable';
import Table from './Table/Table';
import { Route, Routes } from 'react-router-dom';
import Greeting from './Components/Greeting';
import TimelineComponent from './ReactTimeline/TimelineComponent';
import Chk from './chk';
import Registration from './Table/Registration';
import RegistrationTable from './Table/RegistrationTable';
import Update from './Table/Update';
import RegistrationWithFirebase from "./Firebase/RegistrationWithFirebase";
import LoginWithFirebase from "./Firebase/LoginWithFirebase";

function App() {
  const item=[
    {
      key:"1",
      label:"Login",
      children:<Login/>
    },
    {
      key:"2",
      label:"Sign Up",
      children:<Signup/>
    }
  ]
  return (
    <div >
           {/* <Tabs className='card-tab' items={item}/> */}
          {/* <RecursiveComponent/><br/><br/> */}
               {/* <TreeComponent/> */}
               
               {/* <CheckTreeComponent/><br/><br/> */}
               {/* <CheckboxComponent/> */}
              {/* < Table/> */}
              <div>
              {/* <RegistrationTable/><br/><br/>
              <Registration/> */}
             
              </div>
              {/* <CustomerTable/> */}
              <Routes>
                <Route path='/' element={<RegistrationTable/>}/>
                <Route path="/registrationform" element={<Registration/>}/>
                {/* <Route path="/edit/:id" element={<Update/>}/> */}
                <Route path="/registrationform/:userId" element={<Registration/>}/>
                <Route path="/greeting" element={<Greeting/>} />
                <Route path='/registrationwithfirbase' element={<RegistrationWithFirebase/>}/>
                <Route path='/loginwithfirbase' element={<LoginWithFirebase/>}/>
              </Routes>
  
              {/* <TimelineComponent/> */}
              {/* <Chk/> */}
    </div>
  );
}

export default App;


