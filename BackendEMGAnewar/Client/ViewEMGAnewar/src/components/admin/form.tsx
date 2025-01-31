"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleReq, VehicleSchemaReq } from "@/actions/types";
import { getModels } from "@/actions/getModels";
import type { Model, Vehicle, VehicleReqSubmit } from "@/actions/types";
import { ModelSelect } from "./modelselect";
import { handleSubmit } from "@/actions/handleSubmit";
import { BACKEND_URL } from "@/constants";
import { auth } from "@/auth";
import { addVehiculesForm } from "@/actions/addVehicules";
import { editVehicules, editVehiculesForm } from "@/actions/editVehicule";

interface VehicleFormProps {
  onSubmit: (vehicle: FormData) => Promise<Vehicle | VehicleReq | undefined>
  initialData?: (VehicleReq) | (Vehicle) | null;
  openModal: Dispatch<SetStateAction<boolean>>
}

export function MyForm({ onSubmit, initialData, openModal }: VehicleFormProps) {
  const form = useForm<VehicleReq>({
    resolver: zodResolver(VehicleSchemaReq),
    defaultValues: initialData || {
      brand: "",
      modelId: 0,
      year: new Date().getFullYear(),
      description: "",
      price: 0,
      isAvailable: true,
      imageFile: ""
    }
  });
  async function handleSubmit(values: VehicleReqSubmit) {

    try {
      console.log("Données à envoyer:", values);
      // Make sure the imageFile is correctly passed as a file object and not a string
      if (values.file) {
        const formData = new FormData();
        // Append other fields

        formData.append("Brand", values.brand || "");
        formData.append("ModelId", values.modelId!.toString());
        formData.append("Year", values.year!.toString() || "");
        formData.append("Description", values.description || "");
        formData.append("Price", values.price!.toString());
        formData.append("IsAvailable", values.isAvailable.toString());

        // Append image file
        formData.append("ImageFile", values.file!);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        const data = onSubmit(formData)
        //const data = addVehiculesForm(formData)
        if (data != null) {
          toast.success("Véhicule ajouté avec succès!");
        } else {
          toast.error("Échec de l'ajout du véhicule");
        }
        // Assuming onSubmit handles FormData
      } else {
        if ("id" in initialData!) {
          const data = editVehicules(initialData.id, values);
          if (data != null) {
            toast.success("Véhicule modifié avec succès!");
          } else {
            toast.error("Échec de la modification du véhicule");
          }
        }
        openModal(false)
        // If no image is uploaded, submit the regular data
      }


    } catch (error) {
      console.log(error)
    }
  }


  const [file, setFile] = useState<File | undefined>(undefined)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((e) => handleSubmit({ ...e, file: file }))} className="space-y-8 max-w-3xl mx-auto py-10" encType="multipart/form-data">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Renault" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="modelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modèle</FormLabel>
                  <FormControl>
                    <ModelSelect
                      value={field.value?.toString()}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-12">
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input placeholder="http://..." {...field} type='file' accept="image/*"
                      //onChange={(e) => {
                      // On met à jour le champ avec le fichier sélectionné
                      // field.onChange(e.target.files ? e.target.files[0] : null);
                      // }} 

                      onChange={(e) =>
                        setFile(e.target.files?.[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="col-span-6">
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilité</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')} value={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la disponibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Disponible</SelectItem>
                        <SelectItem value="false">Indisponible</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Enregistrer le véhicule</Button>
      </form>
    </Form>
  );
}