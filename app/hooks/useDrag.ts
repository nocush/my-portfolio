import {useRef} from "react";

type UseDragProps = {
    x: number;
    y: number;
    onMove: (x:number, y:number) => void;
}

export function useDrag({x, y, onMove}: UseDragProps){
    const dragging = useRef(false);
    const startMouse = useRef({x: 0, y: 0});
    const startWindow = useRef({x: 0, y: 0});

    const onPointerDown = (e: React.PointerEvent) => {
        if(!window.matchMedia("(pointer: fine)").matches) return;
                
                dragging.current = true;
                
                startMouse.current = {
                    x: e.clientX,
                    y: e.clientY,
                }
                
                startWindow.current = {
                    x,
                    y,
                }
                e.currentTarget.setPointerCapture(e.pointerId);
    }

    const onPointerMove = (e: React.PointerEvent) => {
        if(!dragging.current) return;

                const dx = e.clientX - startMouse.current.x;
                const dy = e.clientY - startMouse.current.y;

                onMove(startWindow.current.x + dx, startWindow.current.y + dy);
    }

    const stopDragging = () => {
        dragging.current = false;
    }

    return { onPointerDown, onPointerMove, onPointerUp: stopDragging, onPointerCancel: stopDragging };
}