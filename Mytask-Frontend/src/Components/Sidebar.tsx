import type React from "react"
import { Home, Calendar, List, BarChart2, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";

const SidebarItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean; fn?:()=>void }> = ({
  icon: Icon,
  label,
  active,
  fn
}) => (
  <Button onClick={fn} variant={active ? "secondary" : "ghost"} className="w-full justify-start">
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </Button>
)

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-card text-card-foreground p-4 space-y-4 border-r">
      <div className="font-bold text-2xl mb-6">My Tasks</div>
      <nav className="space-y-2">
        <SidebarItem icon={Home} label="Dashboard" active fn={()=>navigate('/')} />
        <SidebarItem icon={Calendar} label="Calendar" fn={()=>{navigate('/calendar')}} />
        <SidebarItem icon={List} label="Tasks" fn={()=>{navigate('/goals')}}/>
        <SidebarItem icon={BarChart2} label="Analytics" fn={()=>{navigate('/completed')}} />
        <SidebarItem icon={Settings} label="Settings" />
      </nav>
    </div>
  )
}

