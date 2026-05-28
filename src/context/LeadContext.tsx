import React, { createContext, useState, ReactNode } from "react";

export interface Lead {
  id: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  name: string;
  isNew: boolean;
  time: string;
  phone: string;
  company: string;
  amount: string;
  location: string;
  source: string;
  priority: string;
  priorityColor: string;
  priorityBg: string;
}

interface LeadContextProps {
  leads: Lead[];
  addLead: (
    lead: Omit<
      Lead,
      | "id"
      | "initials"
      | "initialsBg"
      | "initialsColor"
      | "isNew"
      | "time"
      | "priorityColor"
      | "priorityBg"
    >,
  ) => void;
}

export const LeadContext = createContext<LeadContextProps>({
  leads: [],
  addLead: () => {},
});

export const LeadProvider = ({ children }: { children: ReactNode }) => {
  // Data Dummy Awal
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      initials: "AS",
      initialsBg: "#E3F2FD",
      initialsColor: "#1976D2",
      name: "Andi Setiawan",
      isNew: true,
      time: "Baru saja",
      phone: "0812 3456 7890",
      company: "Toko Material",
      amount: "Rp 500.000.000",
      location: "Surabaya, Jawa Timur",
      source: "Sumber: Referal Customer",
      priority: "Prioritas Tinggi",
      priorityColor: "#388E3C",
      priorityBg: "#E8F5E9",
    },
    {
      id: "2",
      initials: "NI",
      initialsBg: "#E8F5E9",
      initialsColor: "#388E3C",
      name: "Nina Indah Sari",
      isNew: true,
      time: "5 menit lalu",
      phone: "0813 2233 4455",
      company: "Butik Fashion",
      amount: "Rp 300.000.000",
      location: "Malang, Jawa Timur",
      source: "Sumber: Campaign KUR",
      priority: "Prioritas Sedang",
      priorityColor: "#F57C00",
      priorityBg: "#FFF3E0",
    },
    {
      id: "3",
      initials: "BS",
      initialsBg: "#EDE7F6",
      initialsColor: "#673AB7",
      name: "Budi Santoso",
      isNew: true,
      time: "15 menit lalu",
      phone: "0821 5566 7788",
      company: "Jasa Kontraktor",
      amount: "Rp 750.000.000",
      location: "Sidoarjo, Jawa Timur",
      source: "Sumber: Website",
      priority: "Prioritas Tinggi",
      priorityColor: "#388E3C",
      priorityBg: "#E8F5E9",
    },
  ]);

  // Fungsi Tambah Lead Baru
  const addLead = (newLeadData: any) => {
    // Generate inisial dari nama
    const names = newLeadData.name.split(" ");
    const initials = names.length > 1 ? names[0][0] + names[1][0] : names[0][0];

    const newLead: Lead = {
      id: Date.now().toString(),
      initials: initials.toUpperCase(),
      initialsBg: "#FFF3E0", // Default warna
      initialsColor: "#F57C00",
      isNew: true,
      time: "Baru saja",
      priorityColor: "#388E3C",
      priorityBg: "#E8F5E9",
      ...newLeadData,
    };

    // Tambahkan ke atas list
    setLeads([newLead, ...leads]);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead }}>
      {children}
    </LeadContext.Provider>
  );
};
