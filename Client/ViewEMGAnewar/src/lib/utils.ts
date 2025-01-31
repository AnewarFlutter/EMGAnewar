import { Vehicle, VehicleReq } from "@/actions/types";
import { BACKEND_URL } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function addBaseUrlToImageUrls(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.map(vehicle => {
    // Vérifie si `imageUrl` existe et ajoute le baseUrl au début
    if (vehicle.imageUrl) {
      vehicle.imageUrl = BACKEND_URL + vehicle.imageUrl;
    }
    return vehicle;
  });
}

export function addIsNew(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.map(vehicle =>  ({
    ...vehicle,
    isNew: true,  // Ajoute l'attribut isActive à chaque élément
  }));
}