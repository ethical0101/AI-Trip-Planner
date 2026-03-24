import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getRelevantImage, getPlaceholderImage } from "../../services/ImageService";

export default function PlannedTrip({ details, location }) {
    const [loadingImages, setLoadingImages] = useState({});
    const [placeImages, setPlaceImages] = useState({});

    if (!details) {
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                    🏕️ Daily Itinerary
                </Text>
                <Text style={{ fontSize: 14, color: "#999" }}>
                    No itinerary available
                </Text>
            </View>
        );
    }

    // Handle both array and object formats
    const planArray = Array.isArray(details) ? details : Object.values(details || {});

    if (!planArray || planArray.length === 0) {
        return (
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                    🏕️ Daily Itinerary
                </Text>
                <Text style={{ fontSize: 14, color: "#999" }}>
                    No activities planned
                </Text>
            </View>
        );
    }

    const handleImageLoad = (key) => {
        setLoadingImages(prev => ({ ...prev, [key]: false }));
    };

    const handleImageError = (key) => {
        setLoadingImages(prev => ({ ...prev, [key]: false }));
    };

    // Fetch images for all places
    useEffect(() => {
        const fetchAllImages = async () => {
            if (!planArray || planArray.length === 0) return;

            planArray.forEach((dayDetail, dayIndex) => {
                const places = dayDetail.places || dayDetail.plan || [];
                places.forEach(async (place, placeIndex) => {
                    const imageKey = `${dayIndex}-${placeIndex}`;
                    const placeName = place.name || place.placeName;
                    if (placeName && !placeImages[imageKey]) {
                        const url = await getRelevantImage({
                            name: placeName,
                            location,
                            type: "place",
                        });
                        setPlaceImages(prev => ({ ...prev, [imageKey]: url }));
                    }
                });
            });
        };
        fetchAllImages();
    }, [details, location]);

    return (
        <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text style={{ fontSize: 20, fontFamily: "outfit-bold", marginBottom: 15 }}>
                🏕️ Daily Itinerary
            </Text>
            {planArray.map((dayDetail, index) => {
                const dayNumber = dayDetail.day || index + 1;
                const theme = dayDetail.theme || "";
                const places = dayDetail.places || dayDetail.PlacesToVisit || [];

                return (
                    <View
                        key={index}
                        style={{
                            marginBottom: 20,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 10,
                            padding: 15,
                            borderWidth: 1,
                            borderColor: "#eee",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: "outfit-bold",
                                marginBottom: 10,
                                color: "#FF6B6B",
                            }}
                        >
                            📅 Day {dayNumber}
                            {theme ? ` - ${theme}` : ""}
                        </Text>

                        {places && places.length > 0 ? (
                            places.map((place, placeIndex) => {
                                const imageKey = `${index}-${placeIndex}`;
                                const isLoadingImage = loadingImages[imageKey] !== false;

                                return (
                                    <View
                                        key={placeIndex}
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 15,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            backgroundColor: "#fff",
                                            borderLeftWidth: 4,
                                            borderLeftColor: "#FF6B6B",
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: placeImages[imageKey] || getPlaceholderImage()
                                            }}
                                            style={{
                                                width: "100%",
                                                height: 180,
                                                backgroundColor: "#f0f0f0",
                                            }}
                                            onError={() => handleImageError(imageKey)}
                                        />

                                        <View style={{ padding: 12 }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontFamily: "outfit-bold",
                                                    marginBottom: 6,
                                                    color: "#333",
                                                }}
                                            >
                                                📍 {place.name || place.placeName}
                                            </Text>

                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontFamily: "outfit",
                                                    color: "#666",
                                                    marginBottom: 10,
                                                    lineHeight: 18,
                                                }}
                                            >
                                                {place.description || place.placeDetails}
                                            </Text>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {place.ticketPrice && (
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: "outfit-medium",
                                                            color: "#FF6B6B",
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        💰 Entry: {place.ticketPrice}
                                                    </Text>
                                                )}

                                                {place.timeToVisit && (
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: "outfit",
                                                            color: "#666",
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        ⏱️ {place.timeToVisit}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#999",
                                    fontFamily: "outfit",
                                }}
                            >
                                No activities planned for this day
                            </Text>
                        )}
                    </View>
                );
            })}
        </View>
    );
}
