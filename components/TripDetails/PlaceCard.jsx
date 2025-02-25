import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetPhotoRef } from "../../services/GooglePlaceApi";

export default function PlaceCard({ activity }) {
    const [photoRef, setPhotoRef] = useState(null);

    useEffect(() => {
        if (activity) {
            GetGooglePhotoRef();
        }
    }, [activity]);

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(activity.placeName);
        const photoReference = result?.results[0]?.photos[0]?.photo_reference;
        console.log(photoReference); //1
        setPhotoRef(photoReference);
    };

    const handleNavigatePress = () => {
        if (activity.geoCoordinates) {
            const { latitude, longitude } = activity.geoCoordinates;
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url);
        } else {
            alert("Geo-coordinates not available");
        }
    };

    return (
        <View
            style={{
                padding: 10,
                backgroundColor: "#e8f4f8",
                borderRadius: 15,
                marginTop: 20,
                borderColor: "#9B9B9B",
            }}
        >
            {photoRef ? (
                <Image
                    // source={{ uri: `http://localhost:5000/api/photos?photo_reference=${photoRef}` }}

                    source={{
                        uri:
                            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                            photoRef +
                            "&key=" +
                            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    }}
                    style={{
                        width: "100%",
                        height: 140,
                        borderRadius: 15,
                    }}
                />
            ) : (
                <View
                    style={{
                        width: "100%",
                        height: 120,
                        borderRadius: 15,
                        backgroundColor: "#e8e8e8",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
                        No Image
                    </Text>
                </View>
            )}
            <View
                style={{
                    marginTop: 5,
                }}
            >
                <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                    {activity.placeName}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: "outfit-medium",
                        color: "#7C7C7C",
                    }}
                >
                    {activity.placeDetails}
                </Text>
                <View
                    style={{
                        paddingRight: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                marginTop: 5,
                                fontSize: 17,
                            }}
                        >
                            🎟️Ticket Price:{" "}
                            <Text style={{ fontFamily: "outfit-bold" }}>
                                {activity.ticketPricing}
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                marginTop: 5,
                                fontSize: 17,
                            }}
                        >
                            ⏱️Time To Travel:{" "}
                            <Text style={{ fontFamily: "outfit-bold" }}>
                                {activity.duration}
                            </Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#000",
                            padding: 8,
                            borderRadius: 7,
                            marginLeft: 10,
                        }}
                        onPress={handleNavigatePress}
                    >
                        <Ionicons name="navigate" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
