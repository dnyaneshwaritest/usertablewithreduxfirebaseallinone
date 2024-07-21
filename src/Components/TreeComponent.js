import React, { useState } from "react";
import data from "../checkData.json";
const Treedata = ({ cdata}) => {
    const [showData, setShowData] = useState(false);
    const [showChildData, setShowChildData] = useState(false);
    const handleClick = () => {
           setShowData(!showData); 
    }

    const handleChildClick = () => {
        setShowChildData(!showChildData);
    };
    const tdata = (children ) => {
        const resData = [];
        if (children ) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                let tchild = [];
                tchild = (
                    <div >
                        <div key={child.id} onClick={handleChildClick}>
                            {child.name}
                        </div>
                        {showChildData && child.children && child.children.length > 0 && (
                        <div style={{ marginLeft: 20 }}>{tdata(child.children)}</div>
                    )}
                    </div>
                )
                resData.push(tchild);
            }
        }
        return resData;    

    }

    return (
        <div>

            <div onClick={handleClick} >{cdata.name}</div>
            {showData && cdata.children && cdata.children.length > 0 && (
                <div style={{ marginLeft: 20 }}>
                    {tdata(cdata.children) }
                </div>
            )}
        </div>
    )

}
function TreeComponent() {

    return (
        <div >
            {data.map((child, index) => (
                <Treedata cdata={child} key={index} />
            ))}
        </div>

    );
};

export default TreeComponent;


