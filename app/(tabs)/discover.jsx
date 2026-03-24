import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "react-native-get-random-values";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "./../../context/CreateTripContext";
import { GetPlaceDetails } from "../../services/GooglePlaceApi";
import { getRelevantImage, getDeterministicPlaceholder } from "../../services/ImageService";

export default function Discover() {
    const navigation = useNavigation();
    const { setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    const [images, setImages] = useState({});
    const [loading, setLoading] = useState({});

    const recommendedPlaces = useMemo(
        () => [
            { name: "Paris, France" },
            { name: "Bali, Indonesia" },
            { name: "Dubai, UAE" },
            { name: "Agra, India" },
            { name: "Goa, India" },
            { name: "Kyoto, Japan" },
            { name: "Rome, Italy" },
            { name: "London, UK" },
        ],
        []
    );

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Discover",
        });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const newImages = {};
            const newLoading = {};

            for (const place of recommendedPlaces) {
                newLoading[place.name] = true;
                const imageUrl = await getRelevantImage({
                    name: place.name,
                    location: place.name,
                    type: "destination",
                });
                newImages[place.name] = imageUrl || getDeterministicPlaceholder(place.name);
                newLoading[place.name] = false;
            }

            setImages(newImages);
            setLoading(newLoading);
        };

        fetchImages();
    }, [recommendedPlaces]);

    const handleSelectRecommended = async (placeName) => {
        try {
            const placeDetails = await GetPlaceDetails(placeName);

            if (placeDetails) {
                setTripData({
                    locationInfo: {
                        name: placeDetails.name,
                        coordinates: placeDetails.coordinates,
                        photoRef: null,
                        url: placeDetails.url,
                    },
                });

                router.push("/create-trip/select-traveler");
            }
        } catch (error) {
            console.error("Error selecting recommended place:", error);
        }
    };

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 90,
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <Text style={{ fontSize: 20, fontFamily: "outfit-bold", marginBottom: 15 }}>
                ✨ Recommended Places
            </Text>

            <FlatList
                data={recommendedPlaces}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelectRecommended(item.name)}
                        style={{
                            width: "48%",
                            marginBottom: 15,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 12,
                            overflow: "hidden",
                        }}
                    >
                        <View style={{ height: 120, backgroundColor: "#eee" }}>
                            {loading[item.name] ? (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ActivityIndicator size="small" color="#FF6B6B" />
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: images[item.name] || getDeterministicPlaceholder(item.name) }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            )}
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontFamily: "outfit-medium", fontSize: 14 }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
