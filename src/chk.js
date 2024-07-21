// import React, { useState, useEffect } from 'react';

// const YourComponent = () => {
//   const [tableData, setTableData] = useState([
//     { key: 1, /* other row data */ },
//     { key: 2,  /* other row data */ },
//     // Other rows
//   ]);
//   const [columnChecked, setColumnChecked] = useState(false);

//   useEffect(() => {
//     // Check if all row checkboxes are checked
//     const allChecked = tableData.every(row => row.isChecked);
//     setColumnChecked(allChecked);
//   }, [tableData]);

//   const handleCheckbox = (event) => {
//     const { name, checked } = event.target;

//     // If the "allSelect" checkbox is checked, update all row checkboxes
//     if (name === "allSelect") {
//       const updatedTableData = tableData.map(row => ({
//         ...row,
//         isChecked: checked
//       }));
//       setTableData(updatedTableData);
//     } else {
//       // If a row checkbox is clicked, update its respective row
//       const updatedTableData = tableData.map(row =>
//         row.key === parseInt(name) ? { ...row, isChecked: checked } : row
//       );
//       setTableData(updatedTableData);
//     }
//   };

//   const renderTableHeader = () => {
//     return (
//       <tr>
//         <th style={{ border: '1px solid black', padding: '8px' }}>
//           <input type="checkbox" name="allSelect" onChange={handleCheckbox} checked={columnChecked} />
//         </th>
//         {/* Render other table headers */}
//       </tr>
//     );
//   };

//   const renderTableData = () => {
//     return tableData.map((row) => (
//       <tr key={row.key}>
//         <td style={{ border: '1px solid black', padding: '8px' }}>
//           <input
//             type="checkbox"
//             name={row.key.toString()}
//             checked={row.isChecked}
//             onChange={handleCheckbox}
//           />
//         </td>
//         {/* Render other table data */}
//       </tr>
//     ));
//   };

//   return (
//     <table>
//       <thead>{renderTableHeader()}</thead>
//       <tbody>{renderTableData()}</tbody>
//     </table>
//   );
// };

// export default YourComponent;


import React, { useState, useEffect } from "react";
import { CaretUpOutlined, DownOutlined } from "@ant-design/icons";
import "./Table/table.css";

function TableComponent({ data, columns }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [tableSorting, setTableSorting] = useState({ key: null, direction: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const [searchTableData, setSearchTableData] = useState(data);
  // const [checkboxData, setCheckboxData] = useState(data)
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(column => column.key)); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(columns.map(column => ({ label: column.label, key: column.key, checked: true })));

  useEffect(()=>{
    const allChecked =searchTableData.every(row=>row.isChecked);
    setCheckboxChecked(allChecked);
  }, [searchTableData]);

  const handleCheckbox = (event) => {
    const {name, checked } = event.target;    
    if (name === "allSelect") {        
      const tempUser = searchTableData.map(row =>({
        ...row,        
        isChecked:checked               
      }));     
      setSearchTableData(tempUser);      
    } else {
      const tempUser = searchTableData.map(row =>
        row.index === name ? {...row, isChecked: checked} : row
    );   
    setSearchTableData(tempUser);  
    }
  };
  
  // useEffect(()=>{
  //   const allChecked =checkboxData.every(row=>row.isChecked);
  //   setCheckboxChecked(allChecked);
  // }, [checkboxData]);

  // const handleCheckbox = (event) => {
  //   const {name, checked } = event.target;    
  //   if (name === "allSelect") {        
  //     const tempUser = checkboxData.map(row =>({
  //       ...row,        
  //       isChecked:checked               
  //     }));      
  //     setCheckboxData(tempUser);      
  //   } else {
  //     const tempUser = checkboxData.map(row =>
  //       row.index === name ? {...row, isChecked: checked} : row
  //   );   
  //       setCheckboxData(tempUser);  
  //   }
  // };
  
  const handleSearch = (value) => {
    setSearchValue(value);
    const newData = searchTableData.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSearchTableData(newData);
  };

  const sortableData = () => {
    const sortedData = [...searchTableData];
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
        <th style={{ border: '1px solid black', padding: '8px' }}>
          <input type="checkbox" name="allSelect" onChange={handleCheckbox} checked={checkboxChecked}/>
        </th>
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
      <tr key={row.index}>
        <td style={{ border: '1px solid black', padding: '8px' }}>
          <input type="checkbox"
            name={row.index}
            checked={row.isChecked || false}
            onChange={handleCheckbox}/>
        </td>
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

export default TableComponent;

