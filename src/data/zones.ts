
import React from "react";
import { Leaf, Wind, Shield, Flower } from "lucide-react";

export type PlantZone = {
  id: string;
  name: string;
  description: string;
  ambientLight: string;
  groundColor: string;
  icon: React.ElementType;
  position: [number, number, number]; // Camera position for this zone
  plants: string[]; // IDs of plants in this zone
};

export const zones: PlantZone[] = [
  {
    id: "ayurvedic",
    name: "Ayurvedic Healing Plants",
    description: "Ancient healing traditions from India featuring plants known for their holistic benefits.",
    ambientLight: "#fff5e0", // Warm golden light
    groundColor: "#3a7e23",
    icon: Leaf,
    position: [-15, 3, 0],
    plants: ["6", "7", "9"] // Rosemary, Sage, Thyme represent Ayurvedic plants
  },
  {
    id: "respiratory",
    name: "Respiratory Relief Zone",
    description: "Plants that help ease breathing and support lung health.",
    ambientLight: "#e6f2ff", // Cool, misty blue light
    groundColor: "#2c5e1a",
    icon: Wind,
    position: [0, 3, -15],
    plants: ["1", "8", "11"] // Lavender, Lemon Balm, Calendula represent respiratory plants
  },
  {
    id: "immunity",
    name: "Immunity Boosters",
    description: "Plants that strengthen the body's natural defenses and promote overall wellness.",
    ambientLight: "#e0ffe0", // Fresh green light
    groundColor: "#274714",
    icon: Shield,
    position: [15, 3, 0],
    plants: ["2", "3", "10"] // Aloe Vera, Basil, Echinacea represent immunity boosters
  },
  {
    id: "floral",
    name: "Floral & Aromatic Garden",
    description: "Beautiful flowering plants with therapeutic properties and soothing aromas.",
    ambientLight: "#fff0f5", // Soft pink light
    groundColor: "#3a7e23",
    icon: Flower,
    position: [0, 3, 15],
    plants: ["4", "5", "12"] // Mint, Chamomile, Feverfew represent floral/aromatic plants
  }
];

export const getZoneByPlantId = (plantId: string): PlantZone | null => {
  for (const zone of zones) {
    if (zone.plants.includes(plantId)) {
      return zone;
    }
  }
  return null;
};

export const getZoneById = (zoneId: string): PlantZone | null => {
  return zones.find(zone => zone.id === zoneId) || null;
};
