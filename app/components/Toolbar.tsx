import Image from "next/image";
import about from "../assets/about-placeholder.webp";
import skills from "../assets/skills.webp";
import {Sun, Moon} from "lucide-react";

type ToolbarProps = {
    onOpenWindow: (id: string) => void;
}

export default function Toolbar({ onOpenWindow }: ToolbarProps) {
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };
    return (
        <div className="text-sm fixed flex bottom-4 items-center gap-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-1 shadow-2xl dark:bg-black/20">
            <button className="group flex flex-col items-center justify-center transition-transform hover:scale-110 sm:shrink-1" onClick={toggleTheme}>
                
                    <Sun className="h-12 w-12 dark:hidden" />
                    <Moon className="hidden h-12 w-12 dark:block" />
                <p>
                    Toggle<br />theme
                </p>
            </button>
            <div className="task-card flex flex-col items-center justify-center sm:shrink-1 hover:scale-110 transition-transform" onClick={() => onOpenWindow("about")}>
              <Image src={about} alt="About" className="w-14 h-14 rounded-full " />
              <p>About me</p>
            </div>
            <div className="task-card flex flex-col items-center justify-center gap-4 sm:shrink-1 hover:scale-110 transition-transform" onClick={() => onOpenWindow("skills")}>
              <Image src={skills} alt="Skills" className="w-14 h-14 rounded-full " />
              <p>Skills</p>
            </div>
          </div>
    )
}