import { Search, ChefHat, SlidersHorizontal, LogOut, User, Phone } from "lucide-react@0.487.0";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ChefHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
  currentView: "browse" | "bookings";
  onViewChange: (view: "browse" | "bookings") => void;
  bookingCount?: number;
  onLogout?: () => void;
  phoneNumber?: string;
}

export function ChefHeader({ 
  searchQuery, 
  onSearchChange, 
  onFilterClick,
  currentView,
  onViewChange,
  bookingCount = 0,
  onLogout,
  phoneNumber
}: ChefHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getInitials = (phone: string) => {
    return phone.slice(-2);
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick = {() => onViewChange('browse')}>
            <ChefHat className="w-8 h-8 text-orange-600 dark:text-orange-500" />
            <h1 className="text-orange-600 dark:text-orange-500">ChefHub</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* {phoneNumber && ( */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-accent/50 rounded-lg px-3 py-2 transition-colors cursor-pointer outline-none">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">{getGreeting()}</span>
                    <span className="font-medium">Hey Foodie 👋</span>
                  </div>
                  <Avatar className="w-9 h-9 border-2 border-orange-500/20">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                      {/* {getInitials(phoneNumber)} */}{91}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>My Account</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        +91 
                        {/* {phoneNumber} */}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onViewChange('browse')} className="cursor-pointer">
                    <ChefHat className="w-4 h-4 mr-2" />
                    Browse Chefs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onViewChange('bookings')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    My Bookings
                    {bookingCount > 0 && (
                      <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {bookingCount}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {onLogout && (
                    <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            {/* // )} */}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search chefs by name, cuisine, or specialty..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={onFilterClick} variant="outline">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </header>
  );
}