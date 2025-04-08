import { useMemo, useState } from "react";

import TimelineLane from "./lane";
import TimelineHeader from "./header";

import assignLanes from "../../utils/assignLanes";
import { differenceInDays, format, parseISO } from "date-fns";
import timelineItems from "../../data/timelineItems.js";
import { DAY_IN_MILLISECONDS } from "../../constants/time";
import ZoomIn from "../../assets/zoom-in.js";
import ZoomOut from "../../assets/zoom-out.js";

export default function Timeline(){

    const [items, setItems] = useState(timelineItems);

    const [zoom, setZoom] = useState(50);

    const [firstDate, lastDate] = useMemo(()=> {
        return items.reduce((prev, curr) => {
            let [first, last] = prev;
            if(!first || parseISO(curr.start) < parseISO(first)) first = curr.start;
            if(!last || parseISO(curr.end) > parseISO(last)) last = curr.end;
            return [first, last];
        }, [undefined, undefined])
    }, [items]);
    
    const lanes = useMemo(() => assignLanes(items), [items]);

    const daysCount = differenceInDays(parseISO(lastDate), parseISO(firstDate)) + 1;

    const dates = Array.from({ length: daysCount }).map((_, i) =>
        format(new Date(parseISO(firstDate).getTime() + (i * DAY_IN_MILLISECONDS)), "yyyy-MM-dd")
    );

    const handleItemChange = (id, newItem) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? newItem : item)); 
    }

    const handleAddZoom = () => setZoom(prevZoom => prevZoom + 25);
    const handleSubZoom = () => setZoom(prevZoom => prevZoom === 50 ? prevZoom : prevZoom - 25)
    
    return(
        <div>
            <div className="flex gap-4 p-2">
                <button
                    className="cursor-pointer"
                    onClick={handleAddZoom}
                >
                    <ZoomIn width="24px" height="24px"/>
                </button>
                <button
                    className="cursor-pointer"
                    onClick={handleSubZoom}
                >
                    <ZoomOut width="24px" height="24px"/>
                </button>
            </div>
            <div className="w-dvw overflow-x-auto border border-gray-300 rounded" >
                <TimelineHeader dates={dates} zoom={zoom}/>
                {
                    lanes?.map((lane, index) => (
                        <TimelineLane 
                            key={index} 
                            dates={dates} 
                            lane={lane} 
                            onItemChange={handleItemChange} 
                            zoom={zoom}
                        />
                    ))
                }
            </div>
        </div>
    )
}