import type React from "react"
import { Bell, Search, User } from "lucide-react"
import { Input } from "./ui/input" 
import { Button } from "./ui/button" 

export const AppBar: React.FC = () => {
  return (
    <header className="bg-background border-b p-4 flex items-center justify-between">
      <div className="flex items-center w-1/3">
        <Search className="h-5 w-5 text-muted-foreground mr-2" />
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

