import { useState, useMemo, useEffect } from "react";
import { ChefHeader } from "./components/ChefHeader";
import { BottomNav } from "./components/BottomNav";
import { TopBar } from "./components/TopBar";
import { ChefCard, Chef, ChefAPIResponse } from "./components/ChefCard";
import { BookingDialog } from "./components/BookingDialog";
import { FilterSheet, FilterOptions } from "./components/FilterSheet";
import { MyBookings } from "./components/MyBookings";
import { OrderTracking } from "./components/OrderTracking";
import { HeroCarousel } from "./components/HeroCarousel";
import { Login } from "./components/Login";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { Loader2 } from "lucide-react";
import type { Booking } from "./types/booking";
import CONSTANTS_STRINGS from "./constants";

// Transform API response to Chef interface
const transformChefData = (apiChef: ChefAPIResponse): Chef => {
  // Split cuisine string by comma and trim whitespace
  const cuisineArray = apiChef.cuisine
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  // Split specialties string by comma and trim whitespace
  const specialtiesArray = apiChef.specialties
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return {
    id: apiChef.id,
    name: apiChef.name,
    cuisine: cuisineArray.length > 0 ? cuisineArray : ["General"],
    hourlyRate: parseFloat(apiChef.hourlyRate) || 0,
    location: apiChef.location,
    distance: parseFloat(apiChef.distance) || 0,
    image: apiChef.image,
    rating: parseFloat(apiChef.rating) || 0,
    reviewCount: parseInt(apiChef.reviewCount) || 0,
    experience: parseInt(apiChef.experience) || 0,
    bio: apiChef.bio,
    specialties: specialtiesArray.length > 0 ? specialtiesArray : [],
    available: apiChef.available.toLowerCase() === "yes" || apiChef.available.toLowerCase() === "daily",
    isVeg: apiChef.isVeg === "1",
    onlyIndoorCooking: apiChef.onlyIndoorCooking === "1",
  };
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(
    null,
  );
  const [currentView, setCurrentView] = useState<
    "browse" | "bookings"
  >("browse");
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);
  
  // API state
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [isLoadingChefs, setIsLoadingChefs] = useState(true);
  const [chefsError, setChefsError] = useState<string | null>(null);

  // Fetch chefs from API
  useEffect(() => {
    const fetchChefs = async () => {
      setIsLoadingChefs(true);
      setChefsError(null);
      
      try {
        const response = await fetch(CONSTANTS_STRINGS.base_url);
        if (!response.ok) {
          throw new Error(`Failed to fetch chefs: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.users && Array.isArray(data.users)) {
          const transformedChefs = data.users.map(transformChefData);
          setChefs(transformedChefs);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching chefs:", error);
        setChefsError(error instanceof Error ? error.message : "Failed to load chefs");
        toast.error("Failed to load chefs. Please try again later.");
      } finally {
        setIsLoadingChefs(false);
      }
    };

    if (isAuthenticated) {
      fetchChefs();
    }
  }, [isAuthenticated]);

  // Sample bookings for demonstration
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK1001",
      chef: {
        id: "1",
        name: "Maria Rodriguez",
        cuisine: ["Italian", "Mediterranean"],
        hourlyRate: 6225,
        location: "Downtown",
        distance: 2.3,
        image: "https://dt4l9bx31tioh.cloudfront.net/eazymedia/eazytrendz/4615/trend20241028055104.jpg?width=750&height=436&mode=crop",
        rating: 4.9,
        reviewCount: 127,
        experience: 12,
        bio: "Specializing in authentic Italian cuisine with a modern twist.",
        specialties: ["Pasta", "Risotto", "Seafood"],
        available: true,
      },
      date: "2025-10-20",
      time: "18:00",
      guests: 8,
      hours: 4,
      location: "123 MG Road, Bangalore",
      occasion: "Anniversary Dinner",
      details: "Italian themed dinner, vegetarian options needed for 2 guests",
      status: "confirmed",
      totalAmount: 24900,
      createdAt: "2025-10-10T10:30:00Z",
      statusHistory: [
        {
          status: "pending",
          timestamp: "2025-10-10T10:30:00Z",
          note: "Booking request submitted.",
        },
        {
          status: "confirmed",
          timestamp: "2025-10-10T14:20:00Z",
          note: "Chef has confirmed your booking!",
        },
      ],
    },
    {
      id: "BK1002",
      chef: {
        id: "2",
        name: "James Chen",
        cuisine: ["Asian", "Fusion"],
        hourlyRate: 7055,
        location: "Westside",
        distance: 4.1,
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGNoZWZ8ZW58MXx8fHwxNzYwNTA5MTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviewCount: 203,
        experience: 15,
        bio: "Award-winning chef blending traditional Asian flavors.",
        specialties: ["Sushi", "Dim Sum", "Wok Dishes"],
        available: true,
      },
      date: "2025-10-18",
      time: "19:30",
      guests: 12,
      hours: 3,
      location: "45 Park Street, Mumbai",
      occasion: "Office Party",
      details: "Asian fusion cuisine, no seafood allergies",
      status: "in-progress",
      totalAmount: 21165,
      createdAt: "2025-10-05T09:15:00Z",
      statusHistory: [
        {
          status: "pending",
          timestamp: "2025-10-05T09:15:00Z",
          note: "Booking request submitted.",
        },
        {
          status: "confirmed",
          timestamp: "2025-10-05T16:45:00Z",
          note: "Chef has confirmed your booking!",
        },
        {
          status: "in-progress",
          timestamp: "2025-10-18T19:30:00Z",
          note: "Chef has started preparing your meal.",
        },
      ],
    },
    {
      id: "BK1003",
      chef: {
        id: "4",
        name: "Carlos Mendez",
        cuisine: ["Mexican", "Latin"],
        hourlyRate: 5395,
        location: "Southside",
        distance: 3.2,
        image: "https://images.unsplash.com/photo-1743353341063-85931c798dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb29rfGVufDF8fHx8MTc2MDUwOTE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviewCount: 156,
        experience: 8,
        bio: "Bringing authentic Mexican street food.",
        specialties: ["Tacos", "Mole", "Ceviche"],
        available: true,
      },
      date: "2025-09-28",
      time: "20:00",
      guests: 6,
      hours: 2.5,
      location: "78 Brigade Road, Bangalore",
      occasion: "Birthday Party",
      details: "Mexican street food theme",
      status: "completed",
      totalAmount: 13487,
      createdAt: "2025-09-20T11:00:00Z",
      statusHistory: [
        {
          status: "pending",
          timestamp: "2025-09-20T11:00:00Z",
          note: "Booking request submitted.",
        },
        {
          status: "confirmed",
          timestamp: "2025-09-20T15:30:00Z",
          note: "Chef has confirmed your booking!",
        },
        {
          status: "in-progress",
          timestamp: "2025-09-28T20:00:00Z",
          note: "Chef has started preparing your meal.",
        },
        {
          status: "completed",
          timestamp: "2025-09-28T22:30:00Z",
          note: "Service completed. Thank you for choosing ChefHub!",
        },
      ],
    },
  ]);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 16600],
    maxDistance: 50,
    cuisineTypes: [],
  });

  const allCuisines = useMemo(() => {
    const cuisines = new Set<string>();
    chefs.forEach((chef) => {
      chef.cuisine.forEach((c) => cuisines.add(c));
    });
    return Array.from(cuisines).sort();
  }, [chefs]);

  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      // Search filter
      const matchesSearch =
        chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        chef.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Price filter
      const matchesPrice =
        chef.hourlyRate >= filters.priceRange[0] &&
        chef.hourlyRate <= filters.priceRange[1];

      // Distance filter
      const matchesDistance = chef.distance <= filters.maxDistance;

      // Cuisine filter
      const matchesCuisine =
        filters.cuisineTypes.length === 0 ||
        chef.cuisine.some((c) => filters.cuisineTypes.includes(c));

      return matchesSearch && matchesPrice && matchesDistance && matchesCuisine;
    });
  }, [chefs, searchQuery, filters]);

  const handleBookChef = (chef: Chef) => {
    setSelectedChef(chef);
  };

  const handleBookingCreated = (bookingData: {
    chef: Chef;
    date: string;
    time: string;
    guests: number;
    hours: number;
    location: string;
    occasion: string;
    details: string;
  }) => {
    const now = new Date().toISOString();
    const newBooking: Booking = {
      id: `BK${Date.now()}`,
      ...bookingData,
      status: "pending",
      totalAmount: bookingData.chef.hourlyRate * bookingData.hours,
      createdAt: now,
      statusHistory: [
        {
          status: "pending",
          timestamp: now,
          note: "Booking request submitted. Waiting for chef confirmation.",
        },
      ],
    };

    fetch('https://control.msg91.com/api/v5/flow', {
      method: 'POST', // Specify the HTTP method as POST
      headers: {
        'Content-Type': 'application/json', // Inform the server that the body is JSON
        'Accept': 'application/json', // Request JSON in the response
        'authkey': '285417AYMJDkZqbsE68f0998bP1'
      },
      body: JSON.stringify({ // Convert the JavaScript object to a JSON string
        template_id: '68f08fa837bed05573719f46',
        short_url: '1',
        userId: 1,
          "recipients": [
            {
              "mobiles": "90031788000",
              "var1": JSON.stringify(newBooking)
            }
      
          ]
      })
    })
    .then(response => {
      if (!response.ok) { // Check if the response status is not in the 200-299 range
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response body
    })
    .then(data => {
      // onBookingCreated(bookingData);
      // onClose();
    });
    setBookings((prev) => [newBooking, ...prev]);
    setCurrentView("browse");
  };

  const handleViewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 16600) count++;
    if (filters.maxDistance < 50) count++;
    if (filters.cuisineTypes.length > 0) count++;
    return count;
  }, [filters]);

  const activeBookingsCount = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed" || b.status === "in-progress"
  ).length;

  const handleLoginSuccess = (phoneNumber: string) => {
    setUserPhone(phoneNumber);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserPhone("");
    setCurrentView("browse");
    setSelectedBooking(null);
    setSelectedChef(null);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background md:pb-0 pb-20">
      {/* Desktop Header - hidden on mobile */}
      <div className="hidden md:block">
        <ChefHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => setIsFilterOpen(true)}
          currentView={currentView}
          onViewChange={setCurrentView}
          bookingCount={activeBookingsCount}
          onLogout={handleLogout}
          phoneNumber={userPhone}
        />
      </div>

      {/* Mobile Top Bar - hidden on desktop */}
      <div className="md:hidden">
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentView={currentView}
        />
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
        {selectedBooking ? (
          <OrderTracking
            booking={selectedBooking}
            onBack={() => setSelectedBooking(null)}
          />
        ) : currentView === "browse" ? (
          <>
            <HeroCarousel />
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="mb-1">Available Chefs</h2>
                  {!isLoadingChefs && (
                    <p className="text-muted-foreground">
                      {filteredChefs.length} chef
                      {filteredChefs.length !== 1 ? "s" : ""}{" "}
                      found
                      {activeFilterCount > 0 &&
                        ` with ${activeFilterCount} active filter${activeFilterCount !== 1 ? "s" : ""}`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isLoadingChefs ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading chefs...</p>
              </div>
            ) : chefsError ? (
              <div className="text-center py-16">
                <p className="text-destructive mb-4">
                  {chefsError}
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : filteredChefs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  No chefs found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      priceRange: [0, 16600],
                      maxDistance: 50,
                      cuisineTypes: [],
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredChefs.map((chef) => (
                  <ChefCard
                    key={chef.id}
                    chef={chef}
                    onBook={handleBookChef}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <MyBookings bookings={bookings} onViewDetails={handleViewBookingDetails} />
        )}
      </main>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        availableCuisines={allCuisines}
      />

      <BookingDialog
        isOpen={selectedChef !== null}
        onClose={() => setSelectedChef(null)}
        chef={selectedChef}
        onBookingCreated={handleBookingCreated}
      />

      {/* Mobile Bottom Navigation - hidden on desktop */}
      <div className="md:hidden">
        <BottomNav
          currentView={currentView}
          onViewChange={setCurrentView}
          bookingCount={activeBookingsCount}
          onFilterClick={() => setIsFilterOpen(true)}
          onLogout={handleLogout}
          phoneNumber={userPhone}
        />
      </div>
      
      <Toaster />
    </div>
  );
}