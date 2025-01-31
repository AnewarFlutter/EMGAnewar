"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModels } from "@/actions/getModels";
import type { Model } from "@/actions/types";

type ModelSelectProps = {
  value: string | undefined;
  onChange: (value: number) => void;
}

export function ModelSelect({ value, onChange }: ModelSelectProps) {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await getModels();
        setModels(data);
      } catch (error) {
        console.error("Erreur lors du chargement des modèles:", error);
      }
    };
    loadModels();
  }, []);

  const handleChange = (newValue: string) => {
    onChange(Number(newValue));
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez un modèle" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id.toString()}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}