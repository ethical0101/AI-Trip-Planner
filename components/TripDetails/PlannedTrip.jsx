import { View, Text } from "react-native";
import React from "react";
import PlaceCard from "./PlaceCard";

export default function PlannedTrip({ details }) {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                🏕️ Plan Details
            </Text>
            {Object.entries(details).map(([day, dayDetails]) => (
                <View key={day} style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "outfit-medium",
                            marginTop: 20,
                        }}
                    >
                        Day {parseInt(day) + 1}
                    </Text>
                    {dayDetails.activities.map((activity, index) => (
                        <PlaceCard key={index} activity={activity} />
                    ))}
                </View>
            ))}
        </View>
    );
}
