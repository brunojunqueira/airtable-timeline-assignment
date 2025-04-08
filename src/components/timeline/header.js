import { format, parseISO } from "date-fns";

export default function TimelineHeader({dates, zoom}){
    return(
        <div className="flex w-fit">
            {dates?.map((date) => (
                <div
                    key={date}
                    className="text-xs text-center border-gray-300 bg-gray-100 p-1"
                    style={{width: zoom + "px"}}
                >
                    {format(parseISO(date), "dd MMM")}
                </div>
            ))}
        </div>
    )
}