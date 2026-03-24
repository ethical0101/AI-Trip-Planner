import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";

export default function FlightInfo({ flightData }) {
    if (!flightData) {
        return null;
    }

    const handleBookingPress = () => {
        if (flightData?.bookingUrl) {
            Linking.openURL(flightData.bookingUrl);
        } else {
            alert("Booking URL not available");
        }
    };

    return (
        <View
            style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "#ddd",
                padding: 15,
                borderRadius: 15,
                backgroundColor: "#f9f9f9",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                    }}
                >
                    ✈️ Flight Details
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#FF6B6B",
                        padding: 8,
                        paddingHorizontal: 15,
                        borderRadius: 7,
                    }}
                    onPress={handleBookingPress}
                >
                    <Text
                        style={{
                            fontFamily: "outfit-medium",
                            fontSize: 12,
                            color: "#fff",
                        }}
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 14,
                        color: "#666",
                    }}
                >
                    Airline: <Text style={{ fontFamily: "outfit-bold", color: "#000" }}>{flightData?.airline || "Not specified"}</Text>
                </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 14,
                        color: "#666",
                    }}
                >
                    Price: <Text style={{ fontFamily: "outfit-bold", fontSize: 16, color: "#FF6B6B" }}>₹ {flightData?.price || "Not available"}</Text>
                </Text>
            </View>

            {flightData?.bookingUrl && (
                <View>
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 12,
                            color: "#999",
                        }}
                    >
                        {flightData.bookingUrl}
                    </Text>
                </View>
            )}
        </View>
    );
}
