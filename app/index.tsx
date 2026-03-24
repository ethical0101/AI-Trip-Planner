import { View } from "react-native";
import Login from "./../components/Login";
import { initFirebase } from "./../configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { auth } = await initFirebase();
        if (!mounted) return;

        if (auth) {
          // Set up auth state listener
          auth.onAuthStateChanged((currentUser) => {
            if (mounted) {
              setUser(currentUser);
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      } catch (e) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <View />;
  }

  return (
    <View>
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
