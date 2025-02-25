import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
    const router = useRouter();

    // Sort the trips by startDate in ascending order to get the latest trip last
    const sortedTrips = userTrips.sort(
        (a, b) =>
            new Date(a.tripData.startDate) - new Date(b.tripData.startDate)
    );

    // Separate the latest trip from the rest of the trips
    const latestTrip = sortedTrips[sortedTrips.length - 1];
    const [selectedTrip, setSelectedTrip] = useState(latestTrip);
    const selectedTripData = selectedTrip
        ? JSON.parse(selectedTrip.tripData)
        : null;

    return (
        <View>
            <View style={{ marginTop: 20 }}>
                {selectedTripData?.locationInfo?.photoRef ? (
                    <Image
                        source={{
                            uri:
                                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                                selectedTripData.locationInfo?.photoRef +
                                "&key=" +
                                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                        }}
                        style={{
                            width: "100%",
                            height: 240,
                            objectFit: "cover",
                            borderRadius: 15,
                        }}
                    />
                ) : (
                    <Image
                        source={require("./../../assets/images/placeholder.jpeg")}
                        style={{
                            width: "100%",
                            height: 240,
                            objectFit: "cover",
                            borderRadius: 15,
                        }}
                    />
                )}

                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            fontFamily: "outfit-medium",
                            fontSize: 20,
                            paddingRight: 10,
                            padding: 5,
                        }}
                    >
                        {selectedTrip?.tripPlan?.location}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 17,
                                color: "#7C7C7C",
                            }}
                        >
                            {selectedTripData
                                ? moment(selectedTripData.startDate).format(
                                      "DD MMM yyyy"
                                  )
                                : ""}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 17,
                                color: "#7C7C7C",
                            }}
                        >
                            🚌 {selectedTripData?.traveler?.title || ""}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/trip-details",
                                params: {
                                    trip: JSON.stringify(selectedTrip),
                                },
                            })
                        }
                        style={{
                            backgroundColor: "#000",
                            padding: 15,
                            borderRadius: 15,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontFamily: "outfit-medium",
                                fontSize: 15,
                                textAlign: "center",
                            }}
                        >
                            See Your Plan
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                {sortedTrips.reverse().map((trip, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedTrip(trip)}
                    >
                        <UserTripCard trip={trip} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
