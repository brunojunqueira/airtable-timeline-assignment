import { differenceInDays } from "date-fns";
import TimelineItem from "./item";

export default function TimelineLane({dates, lane, onItemChange, zoom}){
    return(
        <div className="flex w-fit">
            {
                dates?.map((date) => {
                    const item = lane.find(
                        (i) => new Date(i.start) <= new Date(date) && new Date(i.end) >= new Date(date)
                    );
                        
                    const isItemStart = item && item.start === date;
                    
                    if (isItemStart) {
                        const itemLength = differenceInDays(new Date(item.end), new Date(item.start)) + 1;

                        return (
                            <TimelineItem key={item.id} item={item} length={itemLength} onItemChange={onItemChange} zoom={zoom}/>
                        )
                    }

                    // Don't render overlapping cells (just fill the space)
                    if (item && !isItemStart) return null;

                    return (
                        <TimelineItem key={date} empty zoom={zoom}/>
                    );
                })
            }
        </div>
    )
}