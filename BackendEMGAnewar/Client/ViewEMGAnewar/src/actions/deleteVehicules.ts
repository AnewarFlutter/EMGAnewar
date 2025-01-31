"use server";
import axios from 'axios';
import { BACKEND_URL } from "@/constants";
import { Vehicle, VehicleReq } from "./types";
import { auth } from "@/auth";

export async function deleteVehicules(id: Vehicle["id"] )  { 
    const session = await auth()
    if(!session?.user){
        return null
    }
    
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/Vehicles/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.id}`
            },
        });
        console.log(response);
        
    } catch (error) {
        console.error("Error deleting vehicle", error);
        throw new Error("Error deleting vehicle");
    }
    
    
}