"use client";
import Image from "next/image";
import about from "./assets/about-placeholder.webp";
import skills from "./assets/skills.webp";
import Window from "./components/Window";
import { useWindowManager } from "./hooks/useWindowManager";
import {AnimatePresence, motion} from "motion/react";
import Wave from "react-wavify";
import Toolbar from "./components/Toolbar";

export default function Home() {

  const {windows, moveWindow, focusWindow, openWindow, closeWindow} = useWindowManager([
    {
      id:"about",
      title: "About me",
      x: 100,
      y: 100,
      zIndex: 4,
      isOpen: false,
      content: <div>About me content</div>
    },
    {
      id:"skills",
      title: "Skills",
      x: 300,
      y: 200,
      zIndex: 5,
      isOpen: false,
      content: <div>Skills content</div>
    }
  ]);



  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans min-h-screen bg-orange-200 dark:bg-black text-black dark:text-white" >
      <Wave fill="#1c79ca" paused={false} options={{height: 10, amplitude: 20, speed: 0.15, points: 3}} className="absolute -bottom-25 w-full z-2" />
      <Wave fill="#145792" paused={false} options={{height: 20, amplitude: 20, speed: 0.15, points: 3}} className="absolute bottom-0 w-full z-1" />
      <Wave fill="#113f68" paused={false} options={{height: 20, amplitude: 20, speed: 0.15, points: 3}} className="absolute bottom-15 w-full z-0" />
      <AnimatePresence>
          {windows.filter(window => window.isOpen).map(window => (
            <motion.div
              key={window.id}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.2 }}
                >
            <Window
              key={window.id}
              title={window.title}
              x={window.x}
              y={window.y}
              zIndex={window.zIndex}
              onMove={(x, y) => moveWindow(window.id, x, y)}
              onFocus={() => focusWindow(window.id)}
              onClose={() => closeWindow(window.id)}
            >
              {window.content}
            </Window>
            </motion.div>
          ))}
          </AnimatePresence>
      <main className="main-container flex flex-col items-center justify-center gap-4 p-3 w-full min-h-screen z-4 sm:shrink-1" >
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <h1>WELCOME</h1>
          </div>
          <Toolbar onOpenWindow={openWindow} />
      </main>
    </div>
  );
}
