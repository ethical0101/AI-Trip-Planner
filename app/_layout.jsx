import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { CreateTripContext } from "./../context/CreateTripContext";
import { useState } from "react";

export default function RootLayout() {
    useFonts({
        "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
        outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
        "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    });

    const [tripData, setTripData] = useState([]);

    return (
        <CreateTripContext.Provider value={{ tripData, setTripData }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* Ensure index route (Login) is part of the stack so it can be shown first when unauthenticated */}
                <Stack.Screen name={"index"} />
                <Stack.Screen name={"(tabs)"} />
            </Stack>
        </CreateTripContext.Provider>
    );
}
