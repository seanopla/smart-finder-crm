import React, { createContext, useState, ReactNode } from "react";

export interface Activity {
  id: string;
  time: string;
  type: string;
  desc: string;
  pic: string;
  company: string;
  date: string; // Format sederhana, misal: '20' (tanggal)
  status: "Hari Ini" | "Mendatang" | "Selesai" | "Overdue";
  icon: string;
  iconColor: string;
  iconBg: string;
}

interface ActivityContextProps {
  activities: Activity[];
  addActivity: (data: Partial<Activity>) => void;
}

export const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  addActivity: () => {},
});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      time: "09:00",
      type: "Telepon",
      desc: "Follow up dokumen dengan PT Maju Jaya",
      pic: "Rizky Pratama",
      company: "PT Maju Jaya",
      date: "20",
      status: "Selesai",
      icon: "call",
      iconColor: "#9C27B0",
      iconBg: "#F3E5F5", // Ungu
    },
    {
      id: "2",
      time: "10:30",
      type: "Meeting",
      desc: "Presentasi produk kredit modal kerja",
      pic: "Dewi Anggraini",
      company: "CV Sukses Mandiri",
      date: "20",
      status: "Hari Ini",
      icon: "calendar",
      iconColor: "#1976D2",
      iconBg: "#E3F2FD", // Biru
    },
    {
      id: "3",
      time: "13:00",
      type: "Visit",
      desc: "Survey lapangan ke lokasi usaha nasabah",
      pic: "Budi Santoso",
      company: "PT Cipta Karya",
      date: "20",
      status: "Hari Ini",
      icon: "location",
      iconColor: "#4CAF50",
      iconBg: "#E8F5E9", // Hijau
    },
    {
      id: "4",
      time: "15:30",
      type: "Follow Up",
      desc: "Konfirmasi kelengkapan dokumen",
      pic: "Dewi Anggraini",
      company: "PT Inovasi Tech",
      date: "20",
      status: "Mendatang",
      icon: "document-text",
      iconColor: "#FF9800",
      iconBg: "#FFF3E0", // Oranye
    },
    {
      id: "5",
      time: "16:30",
      type: "Reminder",
      desc: "Pengingat akad kredit",
      pic: "Rizky Pratama",
      company: "CV Sukses Mandiri",
      date: "20",
      status: "Overdue",
      icon: "time",
      iconColor: "#F44336",
      iconBg: "#FFEBEE", // Merah
    },
  ]);

  const addActivity = (data: Partial<Activity>) => {
    const newEntry: Activity = {
      id: Date.now().toString(),
      date: "20", // Default dummy
      status: "Hari Ini",
      icon: "call",
      iconColor: "#1976D2",
      iconBg: "#E3F2FD",
      ...data,
    } as Activity;
    setActivities([...activities, newEntry]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
