import exp from 'constants';
import { z } from 'zod';
export const Model = z.object({
    id: z.number(),
    name: z.string(),
});
export const VehicleSchema = z.object({
    id: z.number(),
    brand: z.string(),
    modelName: z.string(),
    year: z.number(),
    description: z.string(),
    price: z.number(),
    isAvailable: z.boolean(),
    imageUrl: z.string()
});


export const VehicleSchemaReq = z.object({
    brand: z.string().optional(),
    modelId: z.number().optional(),
    year: z.number().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    isAvailable: z.boolean(),
    imageFile: z.string().optional(),
});
export type Model = z.infer<typeof Model>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type VehicleReq = z.infer<typeof VehicleSchemaReq>;
export type VehicleReqSubmit = Omit<VehicleReq, "id"> & {file?: File};
export type VehicleGrid = {isNew:boolean} & Vehicle;