"use server";

import { BACKEND_URL } from "@/constants";
import { Vehicle } from "./types";
export async function getVehicules() {
    const response = await fetch(`${BACKEND_URL}/api/Vehicles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Error fetching vehicles");
    }
    const data = await response.json()  as Vehicle[];
   
    return data
}