"use client";
import Image from "next/image";
import about from "./assets/about-placeholder.webp";
import skills from "./assets/skills.webp";
import Window from "./components/Window";
import { useWindowManager } from "./hooks/useWindowManager";
import {AnimatePresence, motion} from "motion/react";
import Wave from "react-wavify";

export default function Home() {

  const {windows, moveWindow, focusWindow, openWindow, closeWindow} = useWindowManager([
    {
      id:"about",
      title: "About me",
      x: 100,
      y: 100,
      zIndex: 1,
      isOpen: false,
      content: <div>About me content</div>
    },
    {
      id:"skills",
      title: "Skills",
      x: 300,
      y: 200,
      zIndex: 2,
      isOpen: false,
      content: <div>Skills content</div>
    }
  ]);


  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans min-h-screen bg-orange-100 dark:bg-black text-black dark:text-white" >
      <Wave fill="#1776c9" paused={false} options={{height: 20, amplitude: 20, speed: 0.15, points: 3}} className="absolute bottom-0 w-full z-0" />
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
      <main className="main-container flex flex-col items-center justify-center gap-4 border rounded-lg p-4 w-full min-h-screen z-1 sm:shrink-1" >
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <h1>WELCOME</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 " onClick={toggleTheme} >
              Toggle theme
            </button>
          </div>
          <div className="task-container flex flex-row  items-center justify-between gap-4 border bg-orange-200 dark:bg-gray-700 rounded-4xl p-4 sm:shrink-1">
            <div className="task-card flex flex-col items-center justify-center sm:shrink-1" onClick={() => openWindow("about")}>
              <Image src={about} alt="About" className="w-14 h-14 rounded-full hover:scale-110 transition-transform" />
              <p>About me</p>
            </div>
            <div className="task-card flex flex-col items-center justify-center gap-4 sm:shrink-1" onClick={() => openWindow("skills")}>
              <Image src={skills} alt="Skills" className="w-14 h-14 rounded-full hover:scale-110 transition-transform" />
              <p>Skills</p>
            </div>
          </div>
      </main>
    </div>
  );
}
