import react, { useState } from "react";
import TableComponent from "./TableComponent";
import tableData from "./tableData.json";
import Greeting from "../Components/Greeting";
import { Link } from "react-router-dom";
import "./table.css";
function CustomerTable (){
const [showPopup, setShowPopup]=useState(false);

const handleOpenPopup=()=>{
    setShowPopup(true);
}
const handleClosePopup=()=>{
    setShowPopup(false);
}



const columns= [
        {
            label:"ID",
            key:"index",
            render:(record)=>(
                <span onClick={()=>handleOpenPopup(record.index)}>{record.index}</span>
            ),
          
        },
        {
            label:"Requester Name",
            key:"requesterName",
            render: (row) => (
                // <Link to={`/greeting/${row.index}`}>{row.requesterName}</Link>
                <Link to="/greeting">{row.requesterName}</Link>
            ),
            sorting:false        
                
        },
        {
            label:"Subject",
            key:"subject",
            render:(row)=>{
                if(row.subject === "Mobile Campaign"){
                    return (
                        <b>{"Mobile Campaign"}</b>
                     )
                }
                return (
                  <span>{row.subject}</span>  
                )
            },
            sorting:false
         
        },
        {
            label:"Action",
            key:"action",
            render:(record)=>{
                if(record.index === "#47"){
                    return null;
                }
                return(
                    <>
                    <button style={{marginRight:"5px"}}>Edit</button>
                    <button>Delete</button>
                    </>
                )
            },
            sorting: false
            
        }
    ]
    
       
      return(
        <div>
            <TableComponent 
        columns={columns}
        data={tableData}  
            
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
export default CustomerTable;



