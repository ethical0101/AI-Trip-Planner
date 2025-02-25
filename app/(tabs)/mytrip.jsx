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
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./../../configs/FirebaseConfig";
import { router } from "expo-router";

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && GetMyTrips();
    }, [user]);

    const GetMyTrips = async () => {
        setLoading(true);
        setUserTrips([]);
        const q = query(
            collection(db, "UserTrips"),
            where("userEmail", "==", user?.email)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "=>", doc.data()); //1
            setUserTrips((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
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
                {userTrips?.length == 0 ? (
                    <StartNewTripCard />
                ) : (
                    <UserTripList userTrips={userTrips} />
                )}
            </ScrollView>
        </View>
    );
}
