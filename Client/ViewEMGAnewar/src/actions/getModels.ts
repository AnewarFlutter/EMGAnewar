"use server";

import { BACKEND_URL } from "@/constants";
import type { Model } from "./types";

export async function getModels() {
    const response = await fetch(`${BACKEND_URL}/api/CarModels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching models");
    }
    const models = await  response.json() as Model[];

    return models;
  }