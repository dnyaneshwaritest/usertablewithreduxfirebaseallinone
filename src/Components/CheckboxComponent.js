// import React, { useState } from "react";
// import checkData from "../checkData.json";

// const Treedata = ({ cdata }) => {
//   const [showParentData, setShowParentData] = useState(false);
//   const [showChildData, setShowChildData] = useState({});
//   const [treeData, setTreeData] = useState(checkData);

//   const changeCheckboxStatus = (e, id, isParent) => {
//     const { checked } = e.target;
//     const updatedData = treeData.map(user => {
//       if (user.id === id) {
//         user.isChecked = checked;
//         if (isParent && user.children) {
//           user.children.forEach(child => {
//             child.isChecked = checked;
//             if (child.children) {
//               recursiveCheck(child.children, checked);
//             }
//           });
//         }
//       } else if (user.children) {
//         user.children.forEach(child => {
//           if (child.id === id) {
//             child.isChecked = checked;
//             if (child.children) {
//               recursiveCheck(child.children, checked);
//             }
//           }
//         });
//         // Update parent's checked status
//         const parent = treeData.find(item => item.children && item.children.some(child => child.id === id));
//         if (parent) {
//           parent.isChecked = parent.children.every(child => child.isChecked);
//         }
//         const subchildren = treeData.find(item => item.children && item.children.some(child => child.id === id));
//         if (subchildren) {
//           subchildren.isChecked = subchildren.children.every(child => child.isChecked);
//         }
//       }
//       return user;
//     });
//     setTreeData(updatedData);
//   };

//   const recursiveCheck = (children, checked) => {
//     children.forEach(child => {
//       child.isChecked = checked;
//       if (child.children) {
//         recursiveCheck(child.children, checked);
//       }
//     });
//   };

//   const handleClick = () => {
//     setShowParentData(!showParentData);
//   };

//   const handleChildClick = (childId) => {
//     setShowChildData((prevState) => ({
//       ...prevState,
//       [cdata.id]: {
//         ...prevState[cdata.id],
//         [childId]: !prevState[cdata.id]?.[childId],
//       },
//     }));
//   };

//   const tdata = (children) => {
//     const resData = [];
//     if (children) {
//       for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         let tchild = (
//           <div>
//             <div key={child.id} style={{ margin: 20 }}>
//               <input
//                 type="checkbox"
//                 checked={child.isChecked || false}
//                 onChange={(e) => changeCheckboxStatus(e, child.id)}
//               />
//               <span onClick={() => handleChildClick(child.id)}>
//                  {child.name}
//               </span>
//             </div>
//             { showChildData[cdata.id]?.[child.id] &&
//               child.children &&
//               child.children.length > 0 && (
//                 <div style={{ margin: 20 }}>
//                   {tdata(child.children)}
//                 </div>
//               )}
//           </div>
//         );
//         resData.push(tchild);
//       }
//     }
//     return resData;
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="checkbox"
//           checked={cdata.isChecked || false}
//           onChange={(e) => changeCheckboxStatus(e, cdata.id, true)}
//         />
//         <span onClick={handleClick}>{cdata.name}</span>
//       </div>
//       {showParentData &&
//         cdata.children &&
//         cdata.children.length > 0 && <div>{tdata(cdata.children)}</div>}
//     </div>
//   );
// };

// function CheckTreeComponent() {
  
//     return (
//     <div>
//       {checkData.map((child) => (
//         <Treedata
//           cdata={child}
//           key={child.id}
//         />
//       ))}
//     </div>
//   );
// }

// export default CheckTreeComponent;



import React, { useState } from "react";
import checkData from "../checkData.json";

const Treedata = ({ cdata, parentChecked, setParentChecked }) => {
  const [showParentData, setShowParentData] = useState(false);
  const [showChildData, setShowChildData] = useState({});
  const [treeData, setTreeData] = useState(checkData);

  const changeCheckboxStatus = (e, id, isParent) => {
    const { checked } = e.target;
    const updatedData = treeData.map(user => {
      if (user.id === id) {
        user.isChecked = checked;
        if (!isParent && user.parentId) {
          // Update parent's checked status
          const parent = treeData.find(item => item.id === user.parentId);
          if (parent) {
            parent.isChecked = parent.children.every(child => child.isChecked);
            setParentChecked(parent.isChecked);
          }
        }
      }
      if (user.children) {
        user.children.forEach(child => {
          if (child.id === id) {
            child.isChecked = checked;
            if (child.children) {
              recursiveCheck(child.children, checked);
            }
          }
        });
        const parent = treeData.find(item => item.children && item.children.some(child => child.id === id));
        if (parent) {
          parent.isChecked = parent.children.every(child => child.isChecked);
          setParentChecked(parent.isChecked);
        }
      }
      return user;
    });
    setTreeData(updatedData);
  };

  const recursiveCheck = (children, checked) => {
    children.forEach(child => {
      child.isChecked = checked;
      if (child.children) {
        recursiveCheck(child.children, checked);
      }
    });
  };

  const handleClick = () => {
    setShowParentData(!showParentData);
  };

  const handleChildClick = (childId) => {
    setShowChildData((prevState) => ({
      ...prevState,
      [cdata.id]: {
        ...prevState[cdata.id],
        [childId]: !prevState[cdata.id]?.[childId],
      },
    }));
  };

  const tdata = (children) => {
    const resData = [];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let tchild = (
          <div>
            <div key={child.id} style={{ margin: 20 }}>
              <input
                type="checkbox"
                checked={child.isChecked || false}
                onChange={(e) => changeCheckboxStatus(e, child.id)}
              />
              <span onClick={() => handleChildClick(child.id)}>
                 {child.name}
              </span>
            </div>
            { showChildData[cdata.id]?.[child.id] &&
              child.children &&
              child.children.length > 0 && (
                <div style={{ margin: 20 }}>
                  {tdata(child.children)}
                </div>
              )}
          </div>
        );
        resData.push(tchild);
      }
    }
    return resData;
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={cdata.isChecked || false}
          onChange={(e) => changeCheckboxStatus(e, cdata.id, true)}
        />
        <span onClick={handleClick}>{cdata.name}</span>
      </div>
      {showParentData &&
        cdata.children &&
        cdata.children.length > 0 && <div>{tdata(cdata.children)}</div>}
    </div>
  );
};

function CheckTreeComponent() {
  const [parentChecked, setParentChecked] = useState(false);

  return (
    <div>
      {checkData.map((child) => (
        <Treedata
          cdata={child}
          key={child.id}
          parentChecked={parentChecked}
          setParentChecked={setParentChecked}
        />
      ))}
    </div>
  );
}

export default CheckTreeComponent;
