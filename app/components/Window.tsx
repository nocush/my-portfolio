import {useDrag} from "../hooks/useDrag";

type WindowProps = {
    title: string;
    x: number;
    y: number;
    zIndex: number;
    onMove: (x:number, y:number) => void;
    onFocus: () => void
    onClose: () => void;
    children: React.ReactNode;
}

export default function Window({title, x, y, zIndex, onMove, onFocus, onClose, children}: WindowProps){
    const dragHandlers = useDrag({x, y, onMove});

    return(
        <div className="absolute w-fit rounded-lg border border-gray-400 bg-orange-100 shadow-xl" style={{transform: `translate(${x}px, ${y}px)`, zIndex}} onPointerDown={onFocus}>
            <div className="flex items-center justify-between rounded-t-lg bg-orange-200 px-4 py-2 font-semibold">
                <div className="cursor-move flex-1" {...dragHandlers}>
                    {title}
                </div>
                <button onClick={onClose} className="rounded px-2 py-1 hover:bg-red-500 hover:text-white">x</button>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}
