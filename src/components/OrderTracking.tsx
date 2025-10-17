import { ArrowLeft, Calendar, Clock, MapPin, IndianRupee, Check, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Booking, BookingStatus } from "../types/booking";

interface OrderTrackingProps {
  booking: Booking;
  onBack: () => void;
}

const statusConfig = {
  pending: { label: "Pending Confirmation", color: "text-yellow-600", bg: "bg-yellow-100" },
  confirmed: { label: "Confirmed", color: "text-blue-600", bg: "bg-blue-100" },
  "in-progress": { label: "In Progress", color: "text-purple-600", bg: "bg-purple-100" },
  completed: { label: "Completed", color: "text-green-600", bg: "bg-green-100" },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100" },
};

const statusOrder: BookingStatus[] = ["pending", "confirmed", "in-progress", "completed"];

export function OrderTracking({ booking, onBack }: OrderTrackingProps) {
  const config = statusConfig[booking.status];
  const bookingDate = new Date(booking.date);
  const formattedDate = bookingDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getCurrentStatusIndex = () => {
    if (booking.status === "cancelled") return -1;
    return statusOrder.indexOf(booking.status);
  };

  const currentIndex = getCurrentStatusIndex();
  const isCancelled = booking.status === "cancelled";

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1">Booking Details</h2>
            <p className="text-muted-foreground">Booking ID: {booking.id}</p>
          </div>
          <Badge variant="outline" className={`${config.color} border-current`}>
            {config.label}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chef Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
              <ImageWithFallback
                src={booking.chef.image}
                alt={booking.chef.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">{booking.chef.name}</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {booking.chef.cuisine.map((c) => (
                  <Badge key={c} variant="outline">
                    {c}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{booking.chef.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{booking.chef.experience}+ years</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground mb-1">Date & Time</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {formattedDate} at {booking.time}
                </span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Duration & Guests</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {booking.hours} hours • {booking.guests} guests
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{booking.location}</span>
            </div>
          </div>

          {booking.occasion && (
            <div>
              <p className="text-muted-foreground mb-1">Occasion</p>
              <p>{booking.occasion}</p>
            </div>
          )}

          {booking.details && (
            <div>
              <p className="text-muted-foreground mb-1">Special Requests</p>
              <p>{booking.details}</p>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <span>Total Amount</span>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-primary">
                {booking.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isCancelled ? (
            <div className="text-center py-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bg} mb-4`}>
                <Circle className={`w-8 h-8 ${config.color}`} />
              </div>
              <h3 className="mb-2">Booking Cancelled</h3>
              <p className="text-muted-foreground">This booking has been cancelled</p>
            </div>
          ) : (
            <div className="space-y-6">
              {statusOrder.map((status, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                const statusInfo = statusConfig[status];
                const history = booking.statusHistory.find((h) => h.status === status);

                return (
                  <div key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted bg-background"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      {index < statusOrder.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${
                            isCompleted ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4
                        className={`mb-1 ${
                          isCurrent ? "text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {statusInfo.label}
                      </h4>
                      {history && (
                        <p className="text-muted-foreground mb-1">
                          {new Date(history.timestamp).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      )}
                      {history?.note && (
                        <p className="text-muted-foreground">{history.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
