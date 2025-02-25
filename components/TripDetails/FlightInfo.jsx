import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";

export default function FlightInfo({ flightData }) {
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
                borderColor: "#f5f5f5",
                padding: 10,
                borderRadius: 15,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                    }}
                >
                    ✈️ Flights
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#000",
                        padding: 5,
                        width: 100,
                        borderRadius: 7,
                        marginTop: 7,
                    }}
                    onPress={handleBookingPress}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontFamily: "outfit",
                        }}
                    >
                        Book Here
                    </Text>
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 17,
                    marginTop: 7,
                }}
            >
                Airline: {flightData?.airline}
            </Text>
            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 17,
                    marginTop: 7,
                }}
            >
                Price: {flightData?.estimatedPrice} Rs (approx)
            </Text>
        </View>
    );
}
