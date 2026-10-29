import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase';

// Daftar 3 email khusus yang diizinkan masuk sebagai admin
const ALLOWED_ADMIN_EMAILS = [
  "ochalopha@gmail.com",
  "fsasharknoxza@gmail.com",
  "fsasociety@gmail.com"
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const email = currentUser?.email?.toLowerCase();

      // Pastikan user yang masuk ada di dalam daftar whitelist email khusus
      if (currentUser && email && ALLOWED_ADMIN_EMAILS.includes(email)) {
        setUser(currentUser);
      } else if (currentUser) {
        // Jika akun valid di Firebase Auth tapi tidak ada di daftar khusus, paksa logout
        await signOut(auth);
        setUser(null);
        setError("Akses ditolak! Akun Google kamu bukan Admin resmi.");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result?.user?.email?.toLowerCase();

      // Pengecekan langsung setelah pop-up Google selesai dipilih
      if (userEmail && !ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
        await signOut(auth);
        setUser(null);
        throw new Error("Akses ditolak: Email ini tidak memiliki hak akses sebagai admin.");
      }
      return result;
    } catch (err: any) {
      console.error("Popup login error:", err);
      setError(err?.message || "Gagal melakukan login dengan Google.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return { user, loading, error, loginWithGoogle, logout };
}
