import react from "react";
import "./Timeline.css";
function Timeline({events}){
    return(
        <div className="timeline">
            <div>
                
        {events.map((event)=>(
            <div className="timeline-event">
                <div className="timeline-event-date">{event.date}</div>
            <div className="timeline-event-description">{event.description}</div>
            <span className="timeline-event-arrow"></span>
            </div>
        ))}
        </div>
        </div>
    )
};
export default Timeline;