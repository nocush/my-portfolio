import { useState } from "react";

export type ManagedWindow = {
    id: string;
    title: string;
    x: number;
    y: number;
    zIndex: number;
    isOpen: boolean;
    content: React.ReactNode;
}

export function useWindowManager(initialWindows: ManagedWindow[] = []){
    const [windows, setWindows] = useState<ManagedWindow[]>(initialWindows);

    function moveWindow(id: string, x: number, y: number){
        setWindows(current => current.map(w => w.id === id ? {...w, x, y} : w));
    }

    function focusWindow(id: string){
        setWindows(current => {
            const maxZIndex = Math.max(0, ...current.map(w => w.zIndex));
            return current.map(w => w.id === id ? {...w, zIndex: maxZIndex + 1} : w);
        })
    }

    function openWindow(id: string){
        setWindows(current => current.map(w => w.id === id ? {...w, isOpen: true, zIndex: Math.max(0, ...current.map(w => w.zIndex)) + 1} : w));
    }
    
    function closeWindow(id: string){
        setWindows(current => current.map(w => w.id === id ? {...w, isOpen: false} : w));
    }

    return{
        windows,
        moveWindow,
        focusWindow,
        openWindow,
        closeWindow
    }
}