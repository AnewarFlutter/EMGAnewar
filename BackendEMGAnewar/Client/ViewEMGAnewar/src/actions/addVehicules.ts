"use server";

import { BACKEND_URL } from "@/constants";
import { Vehicle, VehicleReq } from "./types";
import { auth } from "@/auth";
import axios from "axios";
import { addBaseUrlToImageUrls } from "@/lib/utils";

export async function addVehiculesForm(newVehicle: FormData )  { 
    const session = await auth()
    if(!session?.user){
        return null
    }
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/Vehicles`, newVehicle, {
            headers: {
                "Authorization": `Bearer ${session.user.id}`
            }
        });
    
        console.log(response);
        const data = response.data as Vehicle;
        return {...data, imageUrl: BACKEND_URL + data.imageUrl};
    } catch (error) {
        console.error("Error adding vehicle", error);
        throw new Error("Error adding vehicle");
    }
    
}