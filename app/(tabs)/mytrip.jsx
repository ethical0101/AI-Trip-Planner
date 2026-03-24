import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import UserTripList from "../../components/MyTrips/UserTripList";
import { initFirebase } from "../../configs/FirebaseConfig";
import { router } from "expo-router";

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);

    useEffect(() => {
        let mounted = true;
        try {
            const { auth: fbAuth, db: fbDb } = initFirebase();
            if (!mounted) return;
            if (fbAuth?.currentUser) {
                setUser(fbAuth.currentUser);
                setDb(fbDb);
            }
        } catch (e) {
            console.error("Firebase init error:", e);
        }
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (user && db) {
            GetMyTrips();
        }
    }, [user, db]);

    const GetMyTrips = async () => {
        setLoading(true);
        setUserTrips([]);

        try {
            const querySnapshot = await db
                .collection("UserTrips")
                .where("userEmail", "==", user?.email)
                .get();

            const trips = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                trips.push(doc.data());
            });
            setUserTrips(trips);
        } catch (err) {
            console.error("Failed to fetch user trips:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                contentContainerStyle={{
                    padding: 25,
                    paddingTop: 25,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 35,
                            fontFamily: "outfit-bold",
                        }}
                    >
                        My Trip's
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/create-trip/search-place")}
                    >
                        <Ionicons name="add-circle" size={50} color="black" />
                    </TouchableOpacity>
                </View>

                {loading && <ActivityIndicator size={"large"} color={"#000"} />}
                {!db && (
                    <Text style={{ marginTop: 20, color: "#666" }}>
                        Firebase is initializing...
                    </Text>
                )}
                {userTrips?.length == 0 ? (
                    <StartNewTripCard />
                ) : (
                    <UserTripList userTrips={userTrips} />
                )}
            </ScrollView>
        </View>
    );
}
