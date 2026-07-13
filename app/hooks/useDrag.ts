import {useRef} from "react";

type UseDragProps = {
    x: number;
    y: number;
    onMove: (x:number, y:number) => void;
    windowRef: React.RefObject<HTMLDivElement | null>;
}

export function useDrag({x, y, onMove, windowRef}: UseDragProps){
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

                let newX = startWindow.current.x + dx;
                let newY = startWindow.current.y + dy;

                // Ensure the window stays within the viewport
                const rect = windowRef.current?.getBoundingClientRect();

                if(!rect) return;

                const maxX = Math.max(0, window.innerWidth - rect.width);
                const maxY = Math.max(0, window.innerHeight - rect.height);

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                onMove(newX, newY);
    }

    const stopDragging = () => {
        dragging.current = false;
    }

    return { onPointerDown, onPointerMove, onPointerUp: stopDragging, onPointerCancel: stopDragging };
}