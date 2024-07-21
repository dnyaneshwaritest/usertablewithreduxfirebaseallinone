import react from "react";
import Timeline from "./Timeline";
import "./Timeline.css";

const timelinedata=[
    {
        date:"2-1-2024",
        description:"hi"
    },
    {
        date:"12-11-2024",
        description:"hello"
    },
    {
        date:"21-10-2024",
        description:"welcome"
    },
    {
        date:"22-6-2024",
        description:"Hello World"
    },
    {
        date:"14-5-2024",
        description:"welcome to the event"
    },
]
function TimelineComponent(){
    return(
        <div className="timeline_container">
            <Timeline    
        mode='alternate'
         events={timelinedata}/>
        </div>
    )
};
export default TimelineComponent;