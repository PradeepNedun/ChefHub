import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Chef } from "./ChefCard";
import {useAppSelector} from "../customHooks/ReduxHook"
import axios from "axios";
import CONSTANTS_STRINGS from "../constants";
import { useParams} from "react-router-dom";
import { ChefHeader } from "./ChefHeader";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  chef: Chef | null;
  onBookingCreated: (bookingData: {
    chef: Chef;
    date: string;
    time: string;
    guests: number;
    hours: number;
    location: string;
    occasion: string;
    details: string;
  }) => void;
}

export function BookingDialog() {
  const [hours, setHours] = useState(3);
  const { id } = useParams<{ id: string }>();
  const [chef, setChef] = useState();

  useEffect(()=>{
    (async()=> {
    try {
    const getUser = await axios.get(`${CONSTANTS_STRINGS.base_url}${CONSTANTS_STRINGS.end_points.getData}`, { params: { id: id } });
    setChef(getUser?.data?.users[0]);

    } catch(err){
    console.log(err);
    }})();
  },[])

  if (!chef) return null;

  const estimatedTotal = chef?.hourlyRate * hours;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const bookingData = {
      chef,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      guests: parseInt(formData.get("guests") as string),
      hours: parseFloat(formData.get("hours") as string),
      location: formData.get("location") as string,
      occasion: formData.get("occasion") as string,
      details: formData.get("details") as string,
    };
    // onBookingCreated(bookingData);
    // onClose();
  };

  return (
    // <Dialog open={isOpen} onOpenChange={onClose}>
    //   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    //     <DialogHeader>
    //       <DialogTitle>Book {chef.name}</DialogTitle>
    //       <DialogDescription>Fill out the details to request a booking</DialogDescription>
    //     </DialogHeader>
    <>
         <div className="hidden md:block">
                <ChefHeader/>
        </div>
        <div className="space-y-6 pad-book-chef">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
              <ImageWithFallback
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">{chef.name}</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {[chef?.cuisine].map((c) => (
                  <Badge key={c} variant="outline">
                    {c}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{chef.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{chef.experience}+ years</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  placeholder="e.g., 6"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hours">Estimated Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  min="1"
                  step="0.5"
                  placeholder="e.g., 3"
                  defaultValue="3"
                  required
                  onChange={(e) => setHours(parseFloat(e.target.value) || 3)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Event Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <Label htmlFor="occasion">Occasion / Event Type</Label>
              <Input
                id="occasion"
                name="occasion"
                type="text"
                placeholder="e.g., Birthday party, dinner party"
              />
            </div>

            <div>
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Any dietary restrictions, menu preferences, or special requests..."
                rows={4}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="space-y-2 mb-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Rate per hour</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <span>{chef.hourlyRate.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated hours</span>
                  <span>{hours} hours</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Estimated Total</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    <span>{estimatedTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                Final price will be confirmed by the chef based on your requirements
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" >
                Cancel
              </Button>
              <Button type="submit">Send Booking Request</Button>
            </DialogFooter>
          </form>
        </div>
        </>
    //   </DialogContent>
    // </Dialog>
    
  );
}
