import { MapPin, Clock, Award, Calendar, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Chef {
  id: string;
  name: string;
  cuisine: string[];
  hourlyRate: number;
  location: string;
  distance: number;
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  bio: string;
  specialties: string[];
  available: boolean;
  isVeg?: boolean;
  onlyIndoorCooking?: boolean;
}

// API Response type
export interface ChefAPIResponse {
  id: string;
  name: string;
  cuisine: string;
  hourlyRate: string;
  location: string;
  distance: string;
  image: string;
  rating: string;
  reviewCount: string;
  experience: string;
  bio: string;
  specialties: string;
  available: string;
  isVeg: string;
  onlyIndoorCooking: string;
}

interface ChefCardProps {
  chef: Chef;
  onBook: (chef: Chef) => void;
}

export function ChefCard({ chef, onBook }: ChefCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <ImageWithFallback
          src={chef.image}
          alt={chef.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="mb-1">{chef.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{chef.location}</span>
              <span>•</span>
              <span>{chef.distance} mi away</span>
            </div>
          </div>
          {chef.available && (
            <Badge variant="secondary" className="shrink-0">
              Available
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {chef.cuisine.map((c) => (
            <Badge key={c} variant="outline">
              {c}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground line-clamp-2 mb-3">{chef.bio}</p>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{chef.rating}</span>
            <span className="text-muted-foreground">({chef.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{chef.experience}+ years</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">From </span>
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-primary">{chef.hourlyRate.toLocaleString("en-IN")}/hr</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onBook(chef)}
          disabled={!chef.available}
          className="w-full"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {chef.available ? "Book Chef" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
