import React, { createContext, useState, ReactNode } from "react";

export interface Journey {
  id: string;
  time: string;
  company: string;
  product: string;
  address: string;
  pic: string;
  type: string; // Meeting, Survey, Follow Up
  status: "Plan" | "On Going" | "Selesai";
  isBreak?: boolean; // Penanda khusus untuk waktu istirahat
}

interface JourneyContextProps {
  journeys: Journey[];
  addJourney: (data: Partial<Journey>) => void;
}

export const JourneyContext = createContext<JourneyContextProps>({
  journeys: [],
  addJourney: () => {},
});

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [journeys, setJourneys] = useState<Journey[]>([
    {
      id: "1",
      time: "09:00",
      company: "PT Maju Jaya",
      type: "Meeting",
      product: "Kredit Modal Kerja",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      status: "Selesai",
    },
    {
      id: "2",
      time: "11:00",
      company: "CV Sukses Mandiri",
      type: "Survey",
      product: "Kredit Investasi",
      address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      status: "On Going",
    },
    {
      id: "3",
      time: "13:30",
      company: "Break / Istirahat",
      type: "",
      product: "13:30 - 14:00",
      address: "Istirahat Siang",
      pic: "",
      status: "Plan",
      isBreak: true,
    },
    {
      id: "4",
      time: "14:00",
      company: "PT Sentosa Abadi",
      type: "Follow Up",
      product: "Kredit Modal Kerja",
      address: "Jl. Kuningan Mulia No. 9, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      status: "Plan",
    },
    {
      id: "5",
      time: "15:30",
      company: "Koperasi Sejahtera",
      type: "Meeting",
      product: "Pembukaan Rekening",
      address: "Jl. TB Simatupang No. 89, Jakarta Selatan",
      pic: "Rizky Pratama (RM)",
      status: "Plan",
    },
  ]);

  const addJourney = (data: Partial<Journey>) => {
    const newEntry: Journey = {
      id: Date.now().toString(),
      status: "Plan",
      ...data,
    } as Journey;
    setJourneys([...journeys, newEntry]); // Ditambahkan ke bawah
  };

  return (
    <JourneyContext.Provider value={{ journeys, addJourney }}>
      {children}
    </JourneyContext.Provider>
  );
};
