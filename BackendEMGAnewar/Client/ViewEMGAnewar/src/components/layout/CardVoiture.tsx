import { Card, CardDescription, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import type { Vehicle } from "@/actions/types";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { BACKEND_URL } from "@/constants";

interface CardVehiculesProps {
    vehicules: Vehicle[]
}

export const CardVehicules = ({vehicules}:CardVehiculesProps) => {
    if(vehicules.length === 0) {
        return (
            <div className="flex w-full justify-center items-center border p-3">
                <h1>Aucune Voitures pour le moment</h1>
            </div>
        )}
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {vehicules.map((voiture) => (
                <Card key={voiture.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">   
                    <CardHeader className="p-0">
                        <div className="relative w-full h-48">
                            <Image 
                                src={`${BACKEND_URL}${voiture.imageUrl}`} 
                                alt={voiture.brand}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <CardTitle className="text-xl">
                                {voiture.brand} {voiture.modelName}
                            </CardTitle>
                            <Badge 
                                variant={voiture.isAvailable ? "default" : "destructive"}
                                className="text-xs opacity-85 cursor-default select-none"
                            >
                                {voiture.isAvailable ? "Disponible" : "Vendu"}
                            </Badge>
                        </div>
                        <CardDescription className="text-sm text-gray-600 mb-1">
                            {voiture.description}
                        </CardDescription>
                        <CardDescription className="text-sm text-gray-600 mb-1">
                            Année: {voiture.year}
                        </CardDescription>
            
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <span className="text-lg font-semibold text-primary w-full text-center">
                            {voiture.price.toLocaleString('fr')} XOF
                        </span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}