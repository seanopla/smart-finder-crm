import React, { createContext, useState, ReactNode } from "react";

export interface Penawaran {
  id: string;
  company: string;
  product: string;
  amount: string;
  date: string;
  tenor: string;
  interest: string;
  pic: string;
  status: "Draft" | "Dikirim" | "Negosiasi" | "Disetujui" | "Ditolak";
  icon: string;
  iconColor: string;
  iconBg: string;
}

interface PenawaranContextProps {
  penawaranList: Penawaran[];
  addPenawaran: (data: Partial<Penawaran>) => void;
}

export const PenawaranContext = createContext<PenawaranContextProps>({
  penawaranList: [],
  addPenawaran: () => {},
});

export const PenawaranProvider = ({ children }: { children: ReactNode }) => {
  // Data Dummy sesuai gambar list pertama
  const [penawaranList, setPenawaranList] = useState<Penawaran[]>([
    {
      id: "1",
      company: "PT Maju Jaya",
      product: "Kredit Modal Kerja",
      amount: "Rp5.000.000.000",
      date: "20 Mei 2024",
      tenor: "60 Bulan",
      interest: "9.50%",
      pic: "Rizky Pratama",
      status: "Disetujui",
      icon: "business",
      iconColor: "#4CAF50",
      iconBg: "#E8F5E9",
    },
    {
      id: "2",
      company: "CV Sukses Mandiri",
      product: "Kredit Investasi",
      amount: "Rp2.000.000.000",
      date: "18 Mei 2024",
      tenor: "48 Bulan",
      interest: "9.75%",
      pic: "Rizky Pratama",
      status: "Dikirim",
      icon: "cube",
      iconColor: "#1976D2",
      iconBg: "#E3F2FD",
    },
    {
      id: "3",
      company: "PT Cipta Karya",
      product: "Kredit Modal Kerja",
      amount: "Rp3.500.000.000",
      date: "17 Mei 2024",
      tenor: "36 Bulan",
      interest: "9.25%",
      pic: "Dewi Anggraini",
      status: "Negosiasi",
      icon: "briefcase",
      iconColor: "#9C27B0",
      iconBg: "#F3E5F5",
    },
    {
      id: "4",
      company: "UD Sejahtera Abadi",
      product: "Kredit Mikro",
      amount: "Rp250.000.000",
      date: "15 Mei 2024",
      tenor: "24 Bulan",
      interest: "10.50%",
      pic: "Budi Santoso",
      status: "Draft",
      icon: "leaf",
      iconColor: "#4CAF50",
      iconBg: "#E8F5E9",
    },
    {
      id: "5",
      company: "PT Inovasi Tech",
      product: "Kredit Investasi",
      amount: "Rp10.000.000.000",
      date: "12 Mei 2024",
      tenor: "60 Bulan",
      interest: "8.75%",
      pic: "Rizky Pratama",
      status: "Ditolak",
      icon: "business",
      iconColor: "#F44336",
      iconBg: "#FFEBEE",
    },
  ]);

  const addPenawaran = (data: Partial<Penawaran>) => {
    const newEntry: Penawaran = {
      id: Date.now().toString(),
      date: "Hari Ini", // Untuk simulasi form nanti
      icon: "document-text",
      iconColor: "#1976D2",
      iconBg: "#E3F2FD",
      ...data,
    } as Penawaran;
    setPenawaranList([newEntry, ...penawaranList]);
  };

  return (
    <PenawaranContext.Provider value={{ penawaranList, addPenawaran }}>
      {children}
    </PenawaranContext.Provider>
  );
};
