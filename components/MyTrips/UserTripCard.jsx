import { View, Text, Image } from "react-native";
import React from "react";
import moment from "moment";

export default function UserTripCard({ trip }) {
    const formatData = (data) => {
        return JSON.parse(data);
    };
    return (
        <View
            style={{
                paddingRight: 10,
                marginTop: 20,
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
            }}
        >
            {/* <Image source={require('./../../assets/images/placeholder.jpeg')}
        style={{
            width:100,
            height:100,
            borderRadius:15
        }}
      /> */}
            <Image
                source={{
                    uri:
                        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                        formatData(trip.tripData).locationInfo?.photoRef +
                        "&key=" +
                        process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                }}
            />
            <View>
                <Text
                    style={{
                        fontFamily: "outfit-medium",
                        fontSize: 18,
                        wordWrap: "break-word",
                        paddingRight: 20,
                    }}
                >
                    {trip.tripPlan?.location}
                </Text>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 14,
                        color: "#7C7C7C",
                    }}
                >
                    {moment(formatData(trip.tripData).startDate).format(
                        "DD MMM yyyy"
                    )}
                </Text>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 14,
                        color: "#7C7C7C",
                    }}
                >
                    Travelling: {formatData(trip.tripData).traveler.title}
                </Text>
            </View>
        </View>
    );
}
