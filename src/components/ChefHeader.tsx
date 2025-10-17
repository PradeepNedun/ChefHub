import { Search, ChefHat, SlidersHorizontal, LogOut } from "lucide-react@0.487.0";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick = {() => onViewChange('browse')}>
            <ChefHat className="w-8 h-8" />
            <h1>ChefHub</h1>
          </div>

          <div className="flex items-center gap-3">
            {phoneNumber && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                +91 {phoneNumber}
              </span>
            )}

            {onLogout && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            )}
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
