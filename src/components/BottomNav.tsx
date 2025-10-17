import { Home, User, SlidersHorizontal } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BottomNavProps {
  currentView: "browse" | "bookings";
  onViewChange: (view: "browse" | "bookings") => void;
  bookingCount?: number;
  onFilterClick: () => void;
  onLogout?: () => void;
  phoneNumber?: string;
}

export function BottomNav({
  currentView,
  onViewChange,
  bookingCount = 0,
  onFilterClick,
  onLogout,
  phoneNumber,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-bottom">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {/* Home/Browse */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewChange("browse")}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
              currentView === "browse"
                ? "text-orange-600 dark:text-orange-500"
                : "text-muted-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>

          {/* Filters */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilterClick}
            className="flex flex-col items-center gap-1 h-auto py-2 px-4 text-muted-foreground"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-xs">Filters</span>
          </Button>

          {/* Profile/User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-4 text-muted-foreground"
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mb-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {phoneNumber && (
                <DropdownMenuItem disabled>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Phone</span>
                    <span>+91 {phoneNumber}</span>
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onLogout && (
                <DropdownMenuItem onClick={onLogout} className="text-red-600 dark:text-red-400">
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
