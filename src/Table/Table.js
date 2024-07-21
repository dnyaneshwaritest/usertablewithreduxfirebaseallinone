import React, {useState} from "react";
import tableData from "./tableData.json";
import "./table.css";

const columns=[
    {
        label:"ID",
        key:"Index"
    },
    {
        label:"Requester Name",
        key:"requesterName"
    },
    {
        label:"Subject",
        key:"subject"
    }
]
function Table (){
    const [currentPage, setCurrentPage] =useState(1);
    const [rowPerPage, setRowPerPage]= useState(5);

    const indexOfLastItem = currentPage * rowPerPage;
    const indexOfFirstItem = indexOfLastItem - rowPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tableData.length / rowPerPage);

    const handlePageChange = (PageNumber) =>{
        setCurrentPage(PageNumber)
    };
    const handlePreviousPage=()=>{
        setCurrentPage((prevPage)=>Math.max(prevPage-1, 1));
    }

    const handleNextPage =()=>{
        setCurrentPage((prevPage)=> Math.min(prevPage+1, totalPages));
    };

    const handleRowsPerChange = (e)=>{
        const selectedRowsPerPage = parseInt(e.target.value);
        setRowPerPage(selectedRowsPerPage);
        setCurrentPage(1);
    }
    return(
        <div>
            <div className="table-dropdown">
            <label className="dropdown-lbl" >Display Row</label>
            <select onChange={handleRowsPerChange}>
                <option >Select</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
            </div>
            <table className="cstm-table" >
                <thead>
                <tr>
                    {columns.map((key)=>(
                        <th  style={{ border: '1px solid black', padding: '8px' }}>{key.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody >
                    {currentItems.map((item)=>(
                        <tr >
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.index}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.requesterName}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.subject}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="table-pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
                {Array.from({length:totalPages}, (_, i)=>(
                    <button 
                    key={i}
                    onClick={()=>handlePageChange(i + 1)}
                    disabled={currentPage === i + 1}
                    >{i+1}</button>
                ))}
                <button onClick={handleNextPage} disabled ={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
};
export default Table;


