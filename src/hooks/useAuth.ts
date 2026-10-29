import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase';

// Daftar 3 email khusus yang diizinkan masuk sebagai admin
const ALLOWED_ADMIN_EMAILS = [
  "admin1@fscgroup.id", // Ganti dengan email admin pertama
  "admin2@fscgroup.id", // Ganti dengan email admin kedua
  "admin3@fscgroup.id"  // Ganti dengan email admin ketiga
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Pastikan user yang masuk ada di dalam daftar whitelist email khusus
      if (currentUser && currentUser.email && ALLOWED_ADMIN_EMAILS.includes(currentUser.email)) {
        setUser(currentUser);
      } else if (currentUser) {
        // Jika akun valid di Firebase Auth tapi tidak ada di daftar khusus, paksa logout
        signOut(auth);
        setUser(null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    // Validasi awal sebelum request ke Firebase (opsional tapi bagus untuk efisiensi)
    if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
      throw new Error("Akses ditolak: Email ini tidak memiliki hak akses sebagai admin.");
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential;
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return { user, loading, login, logout };
}
