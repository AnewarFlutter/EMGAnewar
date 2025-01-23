"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Vehicle } from "@/actions/types";

  interface ColumnActions {
    onEdit?: (data: Vehicle) => void;
    onDelete?: (id: string) => void;
  }
  export const createColumns = (): ColumnDef<Vehicle>[] => {
    const columns: ColumnDef<Vehicle>[] = [
      {
        accessorKey: "brand",
        header: "Marque",
      },
      {
        accessorKey: "modelName",
        header: "Modèle",
      },
      {
        accessorKey: "year",
        header: "Année",
      },
      {
        accessorKey: "price",
        header: "Prix",
        cell: ({ row }) => `${row.getValue("price")}€`
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "isAvailable",
        header: "Disponibilité",
        cell: ({ row }) => row.getValue("isAvailable") ? "Disponible" : "Indisponible"
      },
      {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
          <img 
            src={row.getValue("imageUrl")} 
            alt={`${row.getValue("brand")} ${row.getValue("modelName")}`}
            className="h-10 w-10 object-cover rounded"
          />
        )
      }
    ];
  
    columns.push({
      id: "actions",
      cell: ({ row, table }) => {
        const record = row.original;
        const { onEdit, onDelete } = table.options.meta as ColumnActions;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              {onEdit && <DropdownMenuItem onClick={() => onEdit(record)}>
                Modifier
              </DropdownMenuItem>}
              
              {onDelete && <DropdownMenuItem onClick={() => onDelete(record.id.toString())}>
                Supprimer
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  
    return columns;
  };