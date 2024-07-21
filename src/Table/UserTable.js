import React, { useState, useEffect } from "react";
import { CaretUpOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./table.css";

function UserTable({ data, columns }) {
  const users= useSelector((state)=>state.users.Formdata);
  console.log("TableUsers",users);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [tableSorting, setTableSorting] = useState({ key: null, direction: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const [searchTableData, setSearchTableData] = useState(users);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(column => column.key)); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(columns.map(column => ({ label: column.label, key: column.key, checked: true })));
 
//   useEffect(()=>{
//     const allChecked =searchTableData.every(row=>row.isChecked);
//     setCheckboxChecked(allChecked);
//   }, [searchTableData]);

//   const handleCheckbox = (event) => {
//     const {name, checked } = event.target;    
//     if (name === "allSelect") {
      
//       const tempUser = searchTableData.map(row =>({
//         ...row,        
//         isChecked:checked
       
//       }));
      
//       setSearchTableData(tempUser);      
//     } else {
//       const tempUser = searchTableData.map(row =>
//         row.key === name ? {...row, isChecked: checked} : row
//     );   
//     setSearchTableData(tempUser);  
//     }
//   };
  // const handleCheckbox=(e)=>{
  //   const {name, checked} = e.target;
  //   if(name=== "allSelect"){

  //   }
  // }

  const handleSearch = (value) => {
    setSearchValue(value);
    const newData = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSearchTableData(newData);
  };

  const sortableData = () => {
    const sortedData = [...users];
    if (tableSorting.key !== null) {
      sortedData.sort((a, b) => {
        if (a[tableSorting.key] < b[tableSorting.key]) {
          return tableSorting.direction === "asc" ? -1 : 1;
        }
        if (a[tableSorting.key] > b[tableSorting.key]) {
          return tableSorting.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  };

  const requestSort = (key) => {
    // const column = columns.find(col=>col.key=== key)
    // if(!column || column.sorting === false)return

    let direction = "asc";
    if (tableSorting.key === key && tableSorting.direction === "asc") {
      direction = "desc";
    }
    setTableSorting({ key, direction });
  };

  const indexOfLastItem = currentPage * rowPerPage;
  const indexOfFirstItem = indexOfLastItem - rowPerPage;
  const currentItems = sortableData().slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortableData().length / rowPerPage);

  const handlePageChange = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleRowsPerChange = (e) => {
    const selectedRowsPerPage = parseInt(e.target.value);
    setRowPerPage(selectedRowsPerPage);
    setCurrentPage(1);
  };

  const renderTableHeader = () => {
    return (
      <tr>
        {/* <th style={{ border: '1px solid black', padding: '8px' }}>
          <input type="checkbox" key= "allSelect" name="allSelect" onChange={handleCheckbox} checked={checkboxChecked}/> */}
             {/* checked={searchTableData.filter((user) => user?.isChecked !== true).length < 1} */}
             
            {/* <input type="checkbox"
        id="allSelect"
        name="allSelect"
        onChange={handleCheckbox}
      /> */}
      
        {/* </th> */}
        {columns.map((column) => {
          if (visibleColumns.includes(column.key)) {
            // if (column.label === "Action") {
            //   return <th key={column.key}
            //     style={{ border: '1px solid black', padding: '8px' }}>
            //     {column.label}
            //   </th>
            // }
            return (
              <th key={column.key}
                style={{ border: '1px solid black', padding: '8px' }}>
                {column.label}
                {column.sorting !== false && < CaretUpOutlined onClick={() => requestSort(column.key)} style={{ marginLeft: "10px" }} />}
                {/* {tableSorting.key === column.key && (
                  tableSorting.direction === "asc" ? "asc" : "dsc"
                )} */}
              </th>
            )
          }
          return null; 
        })} 
      </tr>
    );
  };

  const renderTableData = () => {
    return currentItems.map((row) => (
      <tr key={row.key}>
        {/* <td style={{ border: '1px solid black', padding: '8px' }}>
          <input type="checkbox"
            name={row.key}
            checked={row.isChecked}
            onChange={handleCheckbox}/>
        </td> */}
        {columns.map((column) => {
          if (visibleColumns.includes(column.key)) {
            return <td key={column.key} style={{ border: '1px solid black', padding: '8px' }}>
              {column.render ? column.render(row) : row[column.key]}</td>
          }
          return null; 
        })}
      </tr>
    ));
  };

  

  const toggleColumnVisibility = (key) => {
    if (visibleColumns.includes(key)) {
      setVisibleColumns(visibleColumns.filter(columnKey => columnKey !== key));
    } else {
      setVisibleColumns([...visibleColumns, key]);
    }
    console.log(key);
    // Update the state of checked items in the dropdown
    setDropdownItems(prevItems => {
      return prevItems.map(item => {
        if (item.key === key) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  };

  const renderDropdown = () => {
    return (
      dropdownItems.map(item =>
        <div key={item.key} className="column-dropdown">
          <input
            id={item.key}
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleColumnVisibility(item.key)}
          />
          <label htmlFor={item.key}>{item.label}</label>
        </div>
      )
    );
  };

  return (
    <div>
      <div className="table-dropdown">
        <div>
          <label className="dropdown-lbl">Display Row</label>
          <select onChange={handleRowsPerChange} style={{ marginRight: "2%" }} >
            <option>Select</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <label className="select-dropdn" onClick={() => setShowDropdown(!showDropdown)}>Select Column <DownOutlined  style={{fontSize:"10px"}}/></label>
          {showDropdown && renderDropdown()}
          <input type="search" placeholder="Search..." style={{ marginLeft: "5%", marginTop:"0px" }}
            onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>

      <table className="cstm-table" >
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody >
          {renderTableData()}
        </tbody>
      </table>
      <div className="table-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
          >{i + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  )
};

export default UserTable;

 