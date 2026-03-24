import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../context/Options";
import { chatSession } from "../../configs/AiModal";
import { useRouter } from "expo-router";
import { initFirebase } from "./../../configs/FirebaseConfig";

export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [firebaseReady, setFirebaseReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Initialize Firebase first
        const { auth, db } = initFirebase();
        setUser(auth?.currentUser || null);
        setFirebaseReady(true);
    }, []);

    useEffect(() => {
        if (firebaseReady) {
            GenerateAiTrip();
        }
    }, [firebaseReady]);

    const GenerateAiTrip = async () => {
        setLoading(true);

        try {
            const { auth, db } = initFirebase();

            if (!auth?.currentUser) {
                console.error('User not authenticated');
                setLoading(false);
                return;
            }

            const FINAL_PROMT = AI_PROMPT.replace(
                "{location}",
                tripData?.locationInfo?.name
            )
                .replace("{totalDays}", tripData?.totalNoOfDays)
                .replace("{totalNight}", tripData?.totalNoOfDays - 1)
                .replace("{traveler}", tripData?.traveler?.title)
                .replace("{budget}", tripData.budget)
                .replace("{totalDays}", tripData?.totalNoOfDays)
                .replace("{totalNight}", tripData?.totalNoOfDays - 1);

            console.log(FINAL_PROMT);
            const result = await chatSession.sendMessage(FINAL_PROMT);
            console.log(result.response.text());
            const tripResp = JSON.parse(result.response.text());
            setLoading(false);
            const docId = Date.now().toString();
            await db.collection("UserTrips").doc(docId).set({
                userEmail: auth.currentUser.email,
                tripPlan: tripResp,
                tripData: JSON.stringify(tripData),
                docId: docId,
            });

            router.push("(tabs)/mytrip");
        } catch (error) {
            console.error('Error generating trip:', error);
            setLoading(false);
        }
    };

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 45,
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 35,
                    textAlign: "center",
                }}
            >
                PLease Wait...
            </Text>
            <Text
                style={{
                    fontFamily: "outfit-medium",
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 40,
                }}
            >
                We are working to generate your dream trip
            </Text>
            <Image
                source={require("./../../assets/images/plane.gif")}
                style={{
                    width: "100%",
                    height: 300,
                    resizeMode: "contain",
                }}
            />
            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 20,
                    textAlign: "center",
                    color: "#7C7C7C",
                }}
            >
                Do not Go Back
            </Text>
        </View>
    );
}
