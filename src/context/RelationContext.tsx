import React, { createContext, useState, ReactNode } from "react";

export interface Relation {
  id: string;
  name: string;
  position: string;
  company: string;
  type: "Nasabah" | "Prospek" | "Mitra";
  date: string;
  avatarPlaceholder: string; // Ikon sementara jika gambar belum ada
}

interface RelationContextProps {
  relations: Relation[];
  addRelation: (data: Partial<Relation>) => void;
}

export const RelationContext = createContext<RelationContextProps>({
  relations: [],
  addRelation: () => {},
});

export const RelationProvider = ({ children }: { children: ReactNode }) => {
  const [relations, setRelations] = useState<Relation[]>([
    {
      id: "1",
      name: "Rizky Pratama",
      position: "Direktur Utama",
      company: "PT Maju Jaya",
      type: "Nasabah",
      date: "20 Mei 2024",
      avatarPlaceholder: "person",
    },
    {
      id: "2",
      name: "Dewi Anggraini",
      position: "Finance Manager",
      company: "PT Maju Jaya",
      type: "Nasabah",
      date: "18 Mei 2024",
      avatarPlaceholder: "person-outline",
    },
    {
      id: "3",
      name: "CV Sukses Mandiri",
      position: "Supplier",
      company: "Kemitraan",
      type: "Prospek",
      date: "15 Mei 2024",
      avatarPlaceholder: "business",
    },
    {
      id: "4",
      name: "Budi Santoso",
      position: "Owner",
      company: "PT Cipta Karya",
      type: "Mitra",
      date: "10 Mei 2024",
      avatarPlaceholder: "person",
    },
    {
      id: "5",
      name: "PT Innovation Tech",
      position: "Vendor IT",
      company: "Layanan Digital",
      type: "Prospek",
      date: "8 Mei 2024",
      avatarPlaceholder: "cube",
    },
  ]);

  const addRelation = (data: Partial<Relation>) => {
    const newEntry: Relation = {
      id: Date.now().toString(),
      type: "Prospek",
      date: "Hari Ini",
      avatarPlaceholder: "person",
      ...data,
    } as Relation;
    setRelations([newEntry, ...relations]);
  };

  return (
    <RelationContext.Provider value={{ relations, addRelation }}>
      {children}
    </RelationContext.Provider>
  );
};
