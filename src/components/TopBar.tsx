import { Search, ChefHat } from "lucide-react@0.487.0";
import { Input } from "./ui/input";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentView: "browse" | "bookings";
}

export function TopBar({ searchQuery, onSearchChange, currentView }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Logo/Title */}
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          <h1 className="text-orange-600 dark:text-orange-500">ChefHub</h1>
        </div>

        {/* Search - only show when on browse view */}
        {currentView === "browse" && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search chefs, cuisine, specialty..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Title for bookings view */}
        {currentView === "bookings" && (
          <div>
            <h2 className="text-xl">My Bookings</h2>
            <p className="text-sm text-muted-foreground">Manage your chef appointments</p>
          </div>
        )}
      </div>
    </header>
  );
}
