import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
}
