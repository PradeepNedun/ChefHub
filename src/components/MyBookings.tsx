import { Calendar, Clock, MapPin, IndianRupee, ChefHat } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Booking } from "../types/booking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface MyBookingsProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
}

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, color: "text-yellow-600" },
  confirmed: { label: "Confirmed", variant: "default" as const, color: "text-blue-600" },
  "in-progress": { label: "In Progress", variant: "default" as const, color: "text-purple-600" },
  completed: { label: "Completed", variant: "secondary" as const, color: "text-green-600" },
  cancelled: { label: "Cancelled", variant: "outline" as const, color: "text-red-600" },
};

export function MyBookings({ bookings, onViewDetails }: MyBookingsProps) {
  const activeBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed" || b.status === "in-progress"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const config = statusConfig[booking.status];
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
              <ImageWithFallback
                src={booking.chef.image}
                alt={booking.chef.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{booking.chef.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {booking.chef.cuisine.slice(0, 2).map((c) => (
                      <Badge key={c} variant="outline">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge variant={config.variant} className={config.color}>
                  {config.label}
                </Badge>
              </div>

              <div className="space-y-1 text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formattedDate} at {booking.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{booking.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {booking.hours} hours • {booking.guests} guests
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  <span>{booking.totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => onViewDetails(booking)}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="mb-2">No bookings yet</h3>
        <p className="text-muted-foreground mb-4">
          Start browsing chefs to make your first booking
        </p>
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">
            Active ({activeBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No active bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
