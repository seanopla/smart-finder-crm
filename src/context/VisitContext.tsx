import React, { createContext, useState, ReactNode } from "react";

export interface Visit {
  id: string;
  time: string;
  company: string;
  type: string;
  product: string;
  address: string;
  pic: string;
  date: string; // ex: '21'
  statusTab: "Hari Ini" | "Minggu Ini" | "Mendatang";
  isBreak?: boolean;
}

interface VisitContextProps {
  visits: Visit[];
  addVisit: (data: Partial<Visit>) => void;
}

export const VisitContext = createContext<VisitContextProps>({
  visits: [],
  addVisit: () => {},
});

export const VisitProvider = ({ children }: { children: ReactNode }) => {
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: "1",
      time: "08:30",
      company: "PT Maju Jaya",
      type: "Meeting",
      product: "Kredit Modal Kerja",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
    {
      id: "2",
      time: "09:00",
      company: "CV Sukses Mandiri",
      type: "Survey",
      product: "Kredit Investasi",
      address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
    {
      id: "3",
      time: "11:00",
      company: "PT Sentosa Abadi",
      type: "Follow Up",
      product: "Follow Up Dokumen",
      address: "Jl. Kuningan Mulia No. 9, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
    {
      id: "4",
      time: "13:00",
      company: "Break / Istirahat",
      type: "",
      product: "13:00 - 14:00",
      address: "Istirahat Siang",
      pic: "",
      date: "21",
      statusTab: "Hari Ini",
      isBreak: true,
    },
    {
      id: "5",
      time: "14:30",
      company: "Koperasi Sejahtera",
      type: "Meeting",
      product: "Pembukaan Rekening",
      address: "Jl. TB Simatupang No. 89, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
    {
      id: "6",
      time: "16:00",
      company: "UD Makmur Jaya",
      type: "Survey",
      product: "Survey Lokasi Usaha",
      address: "Jl. Raya Pasar Minggu No. 15, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
    {
      id: "7",
      time: "17:30",
      company: "PT Berkah Abadi",
      type: "Meeting",
      product: "Review Limit Kredit",
      address: "Jl. Warung Buncit Raya No. 21, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      date: "21",
      statusTab: "Hari Ini",
    },
  ]);

  const addVisit = (data: Partial<Visit>) => {
    const newEntry: Visit = {
      id: Date.now().toString(),
      statusTab: "Hari Ini",
      date: "21", // Dummy default date
      ...data,
    } as Visit;
    setVisits([...visits, newEntry]);
  };

  return (
    <VisitContext.Provider value={{ visits, addVisit }}>
      {children}
    </VisitContext.Provider>
  );
};
