import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getRelevantImage, getPlaceholderImage } from "../../services/ImageService";

export default function HotelCard({ item, location }) {
    const [imageUrl, setImageUrl] = useState(getPlaceholderImage());
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Fetch real hotel image based on name
        const fetchImage = async () => {
            if (item?.hotelName) {
                const url = await getRelevantImage({
                    name: item.hotelName,
                    location,
                    type: "hotel",
                });
                setImageUrl(url);
            }
        };
        fetchImage();
    }, [item?.hotelName, location]);

    return (
        <View
            style={{
                marginRight: 20,
                width: 180,
            }}
        >
            {!imageError ? (
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                        backgroundColor: "#f0f0f0",
                    }}
                    onError={() => setImageError(true)}
                />
            ) : (
                <View
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                        backgroundColor: "#4A90E2",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 40 }}>🏨</Text>
                </View>
            )}
            <View
                style={{
                    padding: 5,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit-medium",
                        fontSize: 15,
                    }}
                    numberOfLines={2}
                >
                    {item?.hotelName}
                </Text>

                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 12,
                        color: "#999",
                    }}
                    numberOfLines={1}
                >
                    {item?.address}
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
                            fontFamily: "outfit-bold",
                            fontSize: 14,
                            color: "#FF6B6B",
                        }}
                    >
                        ₹ {item?.pricePerNight || item?.price}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 12,
                        }}
                    >
                        ⭐ {item?.rating}
                    </Text>
                </View>

                {item?.description && (
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 11,
                            color: "#666",
                            marginTop: 5,
                        }}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                )}
            </View>
        </View>
    );
}
