export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  source: "browser" | "ip";
}