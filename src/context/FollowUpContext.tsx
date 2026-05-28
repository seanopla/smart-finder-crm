import React, { createContext, useState, ReactNode } from "react";

export interface FollowUp {
  id: string;
  groupDate: string;
  category: string;
  company: string;
  type: string;
  plafond: string;
  status: string;
  statusColor: string;
  statusBg: string;
  date: string;
  pic: string;
  time: string;
  method: string;
  methodIcon: any;
  methodColor: string;
  methodBg: string;
  priority: string;
  priorityColor: string;
}

interface FollowUpContextProps {
  followUps: FollowUp[];
  addFollowUp: (data: Partial<FollowUp>) => void;
}

export const FollowUpContext = createContext<FollowUpContextProps>({
  followUps: [],
  addFollowUp: () => {},
});

export const FollowUpProvider = ({ children }: { children: ReactNode }) => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: "1",
      groupDate: "Hari Ini",
      category: "Hari Ini",
      company: "PT Maju Jaya",
      type: "Modal Kerja",
      plafond: "Rp 500.000.000",
      status: "Survey",
      statusColor: "#4CAF50",
      statusBg: "#E8F5E9",
      date: "20 Mei 2026",
      pic: "Rizky Pratama",
      time: "09:30",
      method: "Telepon",
      methodIcon: "call-outline",
      methodColor: "#1976D2",
      methodBg: "#E3F2FD",
      priority: "Tinggi",
      priorityColor: "#F44336",
    },
    {
      id: "2",
      groupDate: "Hari Ini",
      category: "Hari Ini",
      company: "CV Sinar Abadi",
      type: "Investasi",
      plafond: "Rp 300.000.000",
      status: "Dokumen Masuk",
      statusColor: "#FF9800",
      statusBg: "#FFF3E0",
      date: "20 Mei 2026",
      pic: "Dewi Anggraini",
      time: "10:30",
      method: "WhatsApp",
      methodIcon: "logo-whatsapp",
      methodColor: "#4CAF50",
      methodBg: "#E8F5E9",
      priority: "Sedang",
      priorityColor: "#FF9800",
    },
    {
      id: "3",
      groupDate: "Hari Ini",
      category: "Hari Ini",
      company: "Toko Berkah Jaya",
      type: "Modal Kerja",
      plafond: "Rp 150.000.000",
      status: "Follow Up",
      statusColor: "#1976D2",
      statusBg: "#E3F2FD",
      date: "20 Mei 2026",
      pic: "Budi Santoso",
      time: "13:00",
      method: "Meeting",
      methodIcon: "people-outline",
      methodColor: "#673AB7",
      methodBg: "#EDE7F6",
      priority: "Tinggi",
      priorityColor: "#F44336",
    },
    {
      id: "4",
      groupDate: "Besok, 21 Mei 2026",
      category: "Terjadwal",
      company: "UD Makmur Abadi",
      type: "Modal Kerja",
      plafond: "Rp 100.000.000",
      status: "Dokumen Masuk",
      statusColor: "#FF9800",
      statusBg: "#FFF3E0",
      date: "21 Mei 2026",
      pic: "Dewi Anggraini",
      time: "09:00",
      method: "Telepon",
      methodIcon: "call-outline",
      methodColor: "#F57C00",
      methodBg: "#FFF3E0",
      priority: "Sedang",
      priorityColor: "#FF9800",
    },
  ]);

  const addFollowUp = (data: Partial<FollowUp>) => {
    const newEntry: FollowUp = {
      id: Date.now().toString(),
      groupDate: "Hari Ini", // Masuk ke grup hari ini
      category: "Selesai", // Karena baru disave anggap selesai/hari ini
      statusColor: "#1976D2",
      statusBg: "#E3F2FD",
      methodIcon: "call-outline",
      methodColor: "#1976D2",
      methodBg: "#E3F2FD",
      priorityColor: "#F44336",
      ...data,
    } as FollowUp;

    setFollowUps([newEntry, ...followUps]);
  };

  return (
    <FollowUpContext.Provider value={{ followUps, addFollowUp }}>
      {children}
    </FollowUpContext.Provider>
  );
};
