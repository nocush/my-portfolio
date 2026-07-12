import {useDrag} from "../hooks/useDrag";
import {useRef} from "react";

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
    const windowRef = useRef<HTMLDivElement>(null);
    const dragHandlers = useDrag({x, y, onMove, windowRef});

    return(
        <div ref={windowRef} className="absolute w-fit rounded-xl shadow-xl border-2 border-white/20 dark:bg-black/20" style={{top: y, left: x, zIndex}} onPointerDown={onFocus}>
            <div className="flex items-center justify-between rounded-t-lg bg-gray-300/30 dark:bg-stone-400/20 backdrop-blur-xl px-4 py-2 font-semibold">
                <div className="cursor-move flex-1" {...dragHandlers}>
                    {title}
                </div>
                <button onPointerDown={(e) => e.stopPropagation()} onClick={onClose} className="rounded-full px-2 py-2 bg-red-600 hover:text-white"></button>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-mist-800 rounded-b-lg">
                {children}
            </div>
        </div>
    )
}
