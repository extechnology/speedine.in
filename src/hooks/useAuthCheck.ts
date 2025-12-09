import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import type { User } from "../types";

export default function useCheckLoggedIn() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/auth/check-login/")
      .then((res) => {
        setIsLoggedIn(res.data.is_logged_in);
        setUser(res.data.user ?? null);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, isLoggedIn, loading };
}
