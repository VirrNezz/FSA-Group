import { useState, useEffect } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Sesuaikan path jika firebase.ts ada di root src

export interface SelectionStatus {
  isCurrentlyOpen: boolean;
  openTime?: Date;
  closeTime?: Date;
  announcement: string;
}

export function useSelectionStatus() {
  const [status, setStatus] = useState<SelectionStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const docRef = doc(db, "settings", "selection_schedule");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const now = new Date();
        
        const openTime: Date | undefined = data.openTime instanceof Timestamp ? data.openTime.toDate() : undefined;
        const closeTime: Date | undefined = data.closeTime instanceof Timestamp ? data.closeTime.toDate() : undefined;

        let isCurrentlyOpen = false;
        if (data.isOpen && openTime && closeTime) {
          isCurrentlyOpen = now >= openTime && now <= closeTime;
        }

        setStatus({
          isCurrentlyOpen,
          openTime,
          closeTime,
          announcement: data.announcement || "Pendaftaran belum dibuka."
        });
      } else {
        setStatus({ 
          isCurrentlyOpen: false, 
          announcement: "Konfigurasi jadwal belum dibuat di Firestore." 
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { status, loading };
}
