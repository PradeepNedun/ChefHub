import { SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export interface FilterOptions {
  priceRange: [number, number];
  maxDistance: number;
  cuisineTypes: string[];
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableCuisines: string[];
}

export function FilterSheet({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  availableCuisines,
}: FilterSheetProps) {
  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleDistanceChange = (value: number[]) => {
    onFiltersChange({ ...filters, maxDistance: value[0] });
  };

  const handleCuisineToggle = (cuisine: string) => {
    const newCuisines = filters.cuisineTypes.includes(cuisine)
      ? filters.cuisineTypes.filter((c) => c !== cuisine)
      : [...filters.cuisineTypes, cuisine];
    onFiltersChange({ ...filters, cuisineTypes: newCuisines });
  };

  const handleReset = () => {
    onFiltersChange({
      priceRange: [0, 16600],
      maxDistance: 50,
      cuisineTypes: [],
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filter Chefs
          </SheetTitle>
          <SheetDescription>Refine your search to find the perfect chef</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 py-4">
            <div>
              <Label>Price Range (per hour)</Label>
              <div className="pt-6 pb-2">
                <Slider
                  min={0}
                  max={16600}
                  step={500}
                  value={[filters.priceRange[0], filters.priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>₹{filters.priceRange[0].toLocaleString("en-IN")}</span>
                <span>₹{filters.priceRange[1].toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Maximum Distance</Label>
              <div className="pt-6 pb-2">
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={[filters.maxDistance]}
                  onValueChange={handleDistanceChange}
                  className="w-full"
                />
              </div>
              <div className="text-muted-foreground">
                Within {filters.maxDistance} miles
              </div>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block">Cuisine Types</Label>
              <div className="space-y-3">
                {availableCuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine}
                      checked={filters.cuisineTypes.includes(cuisine)}
                      onCheckedChange={() => handleCuisineToggle(cuisine)}
                    />
                    <label
                      htmlFor={cuisine}
                      className="flex-1 cursor-pointer"
                    >
                      {cuisine}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button onClick={onClose} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
