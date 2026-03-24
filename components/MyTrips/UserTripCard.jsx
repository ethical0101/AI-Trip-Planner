import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { getRelevantImage, getDeterministicPlaceholder } from "../../services/ImageService";

export default function UserTripCard({ trip }) {
    const [thumbUrl, setThumbUrl] = useState(getDeterministicPlaceholder("trip"));
    const [thumbError, setThumbError] = useState(false);

    const formatData = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    };

    const tripData = formatData(trip.tripData);
    const location = trip.tripPlan?.location || "Unknown Destination";
    const startDate = tripData?.startDate;
    const travelerTitle = tripData?.traveler?.title || "Unknown";

    useEffect(() => {
        const fetchThumb = async () => {
            const tripLocation = tripData?.locationInfo?.name || location;
            if (tripLocation) {
                const url = await getRelevantImage({
                    name: tripLocation,
                    location: tripLocation,
                    type: "destination",
                });
                setThumbUrl(url);
            }
        };
        fetchThumb();
    }, [location, tripData?.locationInfo?.name]);

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
            {!thumbError ? (
                <Image
                    source={{ uri: thumbUrl }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                    }}
                    onError={() => setThumbError(true)}
                />
            ) : (
                <Image
                    source={{ uri: getDeterministicPlaceholder(location) }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                    }}
                />
            )}
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontFamily: "outfit-medium",
                        fontSize: 18,
                        wordWrap: "break-word",
                        paddingRight: 20,
                    }}
                >
                    {location}
                </Text>
                {startDate && (
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 14,
                            color: "#7C7C7C",
                        }}
                    >
                        {moment(startDate).format("DD MMM yyyy")}
                    </Text>
                )}
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 14,
                        color: "#7C7C7C",
                    }}
                >
                    Travelling: {travelerTitle}
                </Text>
            </View>
        </View>
    );
}
