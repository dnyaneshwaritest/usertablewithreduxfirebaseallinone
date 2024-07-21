import react, { useState } from "react";
import UserTable from "./UserTable";
// import userData from "./userData.json";
import Greeting from "../Components/Greeting";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/userSlice";
import "./table.css";
function RegistrationTable() {
    const users = useSelector((state) => state.users.Formdata);
    console.error(users);
    const dispatch = useDispatch();
    console.log(users);
    const [showPopup, setShowPopup] = useState(false);

    // const handleOpenPopup=()=>{
    //     setShowPopup(true);
    // }
    const navigate = useNavigate()
    const handleClosePopup = () => {
        setShowPopup(false);
    }
    const handleDelete = (userId) => {
        const updatedUsers = users.filter((user) => user.userId !== userId);
        dispatch(addUser(updatedUsers));

    }
    const handleEdit = (record) => {
        console.log("EditID", record.userId);
        navigate(`/registrationform/${record.userId}`)
    }



    const columns = [
        {
            label: "Id",
            key: "userId",
        },
        {
            label: "First Name",
            key: "fname",
            // render:(record)=>(
            //     <span onClick={()=>handleOpenPopup(record.index)}>{record.index}</span>
            // ),

        },
        {
            label: "Last Name",
            key: "lname",
            // render: (row) => (
            //     // <Link to={`/greeting/${row.index}`}>{row.requesterName}</Link>
            //     <Link to="/greeting">{row.requesterName}</Link>
            // ),
            sorting: false

        },
        {
            label: "Email",
            key: "email",
            // render:(row)=>{
            //     if(row.subject === "Mobile Campaign"){
            //         return (
            //             <b>{"Mobile Campaign"}</b>
            //          )
            //     }
            //     return (
            //       <span>{row.subject}</span>  
            //     )
            // },
            sorting: false

        },
        {
            label: "Password",
            key: "password",
        },
        {
            label: "Phone Number",
            key: "phnumber"
        },
        {
            label: "Action",
            key: "action",
            render: (record) => {

                // if(record.index === "#47"){
                //     return null;
                // }
                return (
                    <>
                        <button onClick={() => handleEdit(record)} style={{ marginRight: "5px" }}>Edit</button>
                        <button onClick={() => handleDelete(record.userId)} >Delete</button>
                    </>
                )
            },
            sorting: false

        }
    ]


    return (
        <div>
            <Link to="/registrationform">Register</Link>
            <Link to="/registrationwithfirbase">Registration With FireBase</Link>
            <Link to="/loginwithfirbase">Login With FireBase</Link>
            <UserTable
                columns={columns}
                data={users}

            />
            {showPopup && (
                <div className="model">
                    <Greeting />
                    <button className="model-btn" onClick={handleClosePopup}>close</button>
                </div>
            )}
        </div>

    );
};
export default RegistrationTable;



