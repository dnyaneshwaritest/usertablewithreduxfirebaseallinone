
// import React, { useState } from 'react';
// import data from "./data.json"

// const TreeNode = ({ data, onCheckboxChange }) => {
//     const [showData, setShowData] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);

//     const handleClick = () => {
       
//             setShowData(!showData);
        
//     };

//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//         onCheckboxChange(data.id, event.target.checked);
//     };

//     return (
//         <div>
//             <div style={{margin:"2%"}}>
//                 <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//                 <span onClick={handleClick}>{data.name}</span>
//             </div>
//             {showData && data.children && data.children.length > 0 && (
//                 <div style={{margin:"2%"}}>
//                     {data.children.map(child => (
//                         <TreeNode key={child.id} data={child} onCheckboxChange={onCheckboxChange} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // Main App component
// const RecursiveComponent = () => {
//     const [checkedItems, setCheckedItems] = useState({});

//     const handleCheckboxChange = (id, isChecked) => {
//         setCheckedItems(prevState => ({
//             ...prevState,
//             [id]: isChecked
//         }));
//     };

//     return (
//         <div>
//             {data.map(child => (
//                 <TreeNode key={child.id} data={child} onCheckboxChange={handleCheckboxChange} />
//             ))}
           
//         </div>
//     );
// };

// export default RecursiveComponent;



// import React, { useState } from 'react';
// import checkData from "./checkData.json";

// const TreeNode = ({ data, onCheckboxChange, checkedItems }) => {
//     const [showData, setShowData] = useState(false);
//     const isChecked = checkedItems[data.id] || false;

//     const handleClick = () => {
//         setShowData(!showData);
//     };

//     const handleCheckboxChange = (event) => {
//         const isChecked = event.target.checked;
//         onCheckboxChange(data.id, isChecked);

//         if (data.children) {
//             // Recursively update the checked state of children nodes
//             data.children.forEach(child => {
//                 onCheckboxChange(child.id, isChecked);
//             });
//         }
//     };

//     return (
//         <div>
//             <div style={{ margin: "2%" }}>
//                 <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//                 <span onClick={handleClick}>{data.name}</span>
//             </div>
//             {showData && data.children && data.children.length > 0 && (
//                 <div style={{ margin: "2%" }}>
//                     {data.children.map(child => (
//                         <TreeNode
//                             key={child.id}
//                             data={child}
//                             onCheckboxChange={onCheckboxChange}
//                             checkedItems={checkedItems}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // Main App component
// const RecursiveComponent = () => {
//     const [checkedItems, setCheckedItems] = useState({});

//     const handleCheckboxChange = (id, isChecked) => {
//         setCheckedItems(prevState => ({
//             ...prevState,
//             [id]: isChecked
//             }));
//     };

//     return (
//         <div>
//             {checkData.map(child => (
//                 <TreeNode
//                     key={child.id}
//                     data={child}
//                     onCheckboxChange={handleCheckboxChange}
//                     checkedItems={checkedItems}
//                 />
//             ))}
//         </div>
//     );
// };

// export default RecursiveComponent;



// import React, { useState } from 'react';
// import checkData from "./checkData.json";

// const TreeNode = ({ data, onCheckboxChange, checkedItems }) => {
//     const [showData, setShowData] = useState(false);
//     const isChecked = checkedItems[data.id] || false;

//     const handleClick = () => {
//         setShowData(!showData);
//     };

//     const handleCheckboxChange = (event) => {
//         const isChecked = event.target.checked;
//         onCheckboxChange(data.id, isChecked);

//         if (data.children) {
//             // Recursively update the checked state of children nodes
//             data.children.forEach(child => {
//                 onCheckboxChange(child.id, isChecked);
//             });
//         }
//     };

//     return (
//         <div>
//             <div style={{ margin: "2%" }}>
//                 <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//                 <span onClick={handleClick}>{data.name}</span>
//             </div>
//             {showData && data.children && data.children.length > 0 && (
//                 <div style={{ margin: "2%" }}>
//                     {data.children.map(child => (
//                         <TreeNode
//                             key={child.id}
//                             data={child}
//                             onCheckboxChange={onCheckboxChange}
//                             checkedItems={checkedItems}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // Main App component
// const RecursiveComponent = () => {
//     const [checkedItems, setCheckedItems] = useState({});

//     const handleCheckboxChange = (id, isChecked) => {
//         setCheckedItems(prevState => {
//             // Create a copy of the previous state
//             const newState = { ...prevState };

//             // Update the current node
//             newState[id] = isChecked;

//             // Update the children if they exist
//             const updateChildren = (children) => {
//                 if (children) {
//                     children.forEach(child => {
//                         newState[child.id] = isChecked;
//                         updateChildren(child.children);
//                     });
//                 }
//             };

//             // Find the current node in the checkData array
//             const findNode = (arr, nodeId) => {
//                 for (let i = 0; i < arr.length; i++) {
//                     if (arr[i].id === nodeId) {
//                         return arr[i];
//                     }
//                     if (arr[i].children) {
//                         const found = findNode(arr[i].children, nodeId);
//                         if (found) return found;
//                     }
//                 }
//                 return null;
//             };

//             const node = findNode(checkData, id);
//             if (node) {
//                 updateChildren(node.children);
//             }

//             return newState;
//         });
//     };

//     return (
//         <div>
//             {checkData.map(child => (
//                 <TreeNode
//                     key={child.id}
//                     data={child}
//                     onCheckboxChange={handleCheckboxChange}
//                     checkedItems={checkedItems}
//                 />
//             ))}
//         </div>
//     );
// };

// export default RecursiveComponent;




import React, { useState } from 'react';
import checkData from "./checkData.json";

const TreeNode = ({ data, onCheckboxChange, checkedItems }) => {
    const [showData, setShowData] = useState(false);
    const isChecked = checkedItems[data.id] || false;

    const handleClick = () => {
        setShowData(!showData);
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        onCheckboxChange(data.id, isChecked);

        if (data.children) {
            // Recursively update the checked state of children nodes
            data.children.forEach(child => {
                onCheckboxChange(child.id, isChecked);
            });
        }

        // Update parent node if necessary
        if (data.parentId && !isChecked) {
            // Check if any other child is still checked
            const siblingsChecked = data.parentId && data.parentId.children.some(childId => checkedItems[childId]);
            if (!siblingsChecked) {
                onCheckboxChange(data.parentId.id, false);
            }
        }
    };

    return (
        <div>
            <div style={{ margin: "2%" }}>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span onClick={handleClick}>{data.name}</span>
            </div>
            {showData && data.children && data.children.length > 0 && (
                <div style={{ margin: "2%" }}>
                    {data.children.map(child => (
                        <TreeNode
                            key={child.id}
                            data={child}
                            onCheckboxChange={onCheckboxChange}
                            checkedItems={checkedItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Main App component
const RecursiveComponent = () => {
    const [checkedItems, setCheckedItems] = useState({});


    
    const handleCheckboxChange = (id, isChecked) => {
        setCheckedItems(prevState => {
            // Create a copy of the previous state
            const newState = { ...prevState };

            // Update the current node
            newState[id] = isChecked;

            // Update the children if they exist
            const updateChildren = (children) => {
                if (children) {
                    children.forEach(child => {
                        newState[child.id] = isChecked;
                        updateChildren(child.children);
                    });
                }
            };

            // Find the current node in the checkData array
            const findNode = (arr, nodeId) => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === nodeId) {
                        return arr[i];
                    }
                    if (arr[i].children) {
                        const found = findNode(arr[i].children, nodeId);
                        if (found) return found;
                    }
                }
                return null;
            };

            const node = findNode(checkData, id);
            if (node) {
                updateChildren(node.children);
            }

            return newState;
        });
    };

    return (
        <div>
            {checkData.map(child => (
                <TreeNode
                    key={child.id}
                    data={child}
                    onCheckboxChange={handleCheckboxChange}
                    checkedItems={checkedItems}
                />
            ))}
        </div>
    );
};

export default RecursiveComponent;

