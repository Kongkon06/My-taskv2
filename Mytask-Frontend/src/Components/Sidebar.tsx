import type React from "react"
import { Home, Calendar, List, BarChart2, Settings } from "lucide-react"
import { Button } from "./ui/button"

const SidebarItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean }> = ({
  icon: Icon,
  label,
  active,
}) => (
  <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start">
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </Button>
)

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-card text-card-foreground p-4 space-y-4 border-r">
      <div className="font-bold text-2xl mb-6">ProductiveWeb</div>
      <nav className="space-y-2">
        <SidebarItem icon={Home} label="Dashboard" active />
        <SidebarItem icon={Calendar} label="Calendar" />
        <SidebarItem icon={List} label="Tasks" />
        <SidebarItem icon={BarChart2} label="Analytics" />
        <SidebarItem icon={Settings} label="Settings" />
      </nav>
    </div>
  )
}

