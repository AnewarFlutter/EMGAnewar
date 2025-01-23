"use client";

import { useState, useMemo, useEffect } from "react";
import { createColumns, DataTable, MyForm } from "@/components/admin";
import { editVehiculesForm} from "@/actions/editVehicule";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Vehicle, VehicleReq } from "@/actions/types";
import { deleteVehicules } from "@/actions/deleteVehicules";
import { addVehiculesForm } from "@/actions/addVehicules";


interface TableProps{
    initialData:  Vehicle[],
}

export function TablePage({initialData}: TableProps) {
  const [data, setData] = useState<Vehicle[]>(initialData);
  const [editingUser, setEditingUser] = useState<Vehicle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const columns = createColumns();

const handleCreate = async (vehicle: FormData) => {
    try {
      // Passer les données du nouveau véhicule
      const result = await addVehiculesForm(vehicle);
      
      if (result) {
        setData(prevData => [...prevData, result]);
        setIsDialogOpen(false);
        return result;
      } else {
        throw new Error("Échec de l'ajout du véhicule");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
};


const handleUpdate = async (vehicle: FormData) => {
    try {
      console.log("hi")
      const result = await editVehiculesForm(vehicle);
      console.log("hi")
      if (result) {
        setData(data.map((record) => 
          record.id === result.id ? result : record
        ));
        setIsDialogOpen(false);
        setEditingUser(null);
        return result;
      } else {
        throw new Error("Échec de la modification du véhicule");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    }
};
  const handleDelete = (id: number) => {
    console.log(id)
    setData(data.filter((record) => record.id != id));
    deleteVehicules(id)
  };

  const handleEdit = (record: Vehicle) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
return (

    <div className="container mx-auto py-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <MyForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
              openModal={setIsDialogOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns}
        data={data}
        onAdd={openCreateDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        
      />
    </div>
  );
}