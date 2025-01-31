"use server";

import { BACKEND_URL } from "@/constants";
import { Vehicle, VehicleReq } from "./types";
import { auth } from "@/auth";
import axios from "axios";

export async function editVehiculesForm(newVehicle: FormData )  { 
    console.log("hi")
    const session = await auth()
    const id = newVehicle.get("id")
    console.log(id)
    if(!session?.user){
        return null
    }
    
    try {
        let vehicule : Pick<Vehicle, "description"| "price" | "imageUrl" | "isAvailable" > ={
            "description": "",
            "price": 0,
            "imageUrl": "",
            "isAvailable": true
          }
        if(!newVehicle.get("ImageFile")){
            console.log("ok")
            for (let [key, value] of newVehicle.entries()) {
                console.log(`${key}: ${value}`);
            }
            vehicule["description"] = newVehicle.get("") as string;
            vehicule["price"] = parseInt(newVehicle.get("")?.toString() || "0");
            vehicule["imageUrl"] = newVehicle.get("") as string;
            vehicule["isAvailable"] = newVehicle.get("IsAvailable") as unknown as boolean;
        }
        const response = await axios.put(`${BACKEND_URL}/api/Vehicles${id}`, newVehicle.get("ImageFile")?newVehicle:vehicule, {
            headers: {
                "Authorization": `Bearer ${session.user.id}`
            }
        });
    
        console.log(response);
        const data = response.data as Vehicle;
        return data;
    } catch (error) {
        console.error("Error adding vehicle", error);
        throw new Error("Error adding vehicle");
    }
    
}


export async function editVehicules(id:number, newVehicle: VehicleReq )  { 
    console.log("hi")
    const session = await auth()
    if(!session?.user){
        return null
    }
    
    try {
        let vehicule : Pick<Vehicle, "description"| "price" | "imageUrl" | "isAvailable" > ={
            "description": newVehicle.description! ,
            "price": newVehicle.price!,
            "imageUrl": "",
            "isAvailable": newVehicle.isAvailable,
          }
       
        const response = await axios.put(`${BACKEND_URL}/api/Vehicles/${id}`, newVehicle, {
            headers: {
                "Authorization": `Bearer ${session.user.id}`
            }
        });
    
        console.log(response);
        const data = response.data as Vehicle;
        return data;
    } catch (error) {
        console.error("Error adding vehicle", error);
        throw new Error("Error adding vehicle");
    }
    
}