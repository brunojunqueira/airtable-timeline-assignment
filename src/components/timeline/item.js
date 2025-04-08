export default function TimelineItem({item, length, empty, onItemChange, zoom}){

    if(empty) return (
        <div
            className="h-10 border-l border-gray-300 flex items-center justify-center"
            style={{
                width: zoom + "px"
            }}
        />
    )

    return(
        <>
            <div
                className="h-10 bg-gray-500 text-white text-xs flex items-center border rounded border-white px-2 relative group"
                style={{ width: `${length * zoom}px` }}
                title={item.name}
            >
                <input 
                    className="overflow-hidden text-ellipsis whitespace-nowrap w-full" 
                    value={item.name} 
                    onChange={(e) => onItemChange(item.id, {...item, name: e.target.value})}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
                    {item.name}
                </div>
            </div>
        </>
    )
}