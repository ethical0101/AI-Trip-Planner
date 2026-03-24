import { View, TextInput, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "./../../context/CreateTripContext";
import { GetPlaceAutocomplete, GetPlaceDetails } from "../../services/GooglePlaceApi";

export default function SearchPlace() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Search Place",
        });
    }, []);

    const handleSearch = async (text) => {
        setSearchText(text);

        if (text.length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const results = await GetPlaceAutocomplete(text);
            setSuggestions(results);
        } catch (error) {
            console.error("Search error:", error);
        }
        setLoading(false);
    };

    const handleSelectPlace = async (place) => {
        setSearchText("");
        setSuggestions([]);
        setLoading(true);

        try {
            const placeDetails = await GetPlaceDetails(
                place.properties.formatted
            );

            if (placeDetails) {
                setTripData({
                    locationInfo: {
                        name: placeDetails.name,
                        coordinates: placeDetails.coordinates,
                        photoRef: null,
                        url: placeDetails.url,
                    },
                });

                setTimeout(() => {
                    router.push("/create-trip/select-traveler");
                }, 500);
            }
        } catch (error) {
            console.error("Error selecting place:", error);
        }
        setLoading(false);
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
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: "outfit-medium",
                    marginBottom: 10,
                }}
            >
                Where do you want to go?
            </Text>

            <View style={{ marginTop: 10, position: "relative" }}>
                <TextInput
                    placeholder="Search destination..."
                    value={searchText}
                    onChangeText={handleSearch}
                    style={{
                        backgroundColor: "#f5f5f5",
                        borderWidth: 2,
                        borderColor: "#ddd",
                        borderRadius: 10,
                        padding: 15,
                        fontSize: 16,
                        fontFamily: "outfit",
                    }}
                />

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#FF6B6B"
                        style={{ marginTop: 20 }}
                    />
                )}

                {suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                        style={{
                            marginTop: 10,
                            maxHeight: 400,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#ddd",
                            zIndex: 20,
                            elevation: 6,
                        }}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectPlace(item)}
                                style={{
                                    padding: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#eee",
                                }}
                            >
                                <Text style={{ fontSize: 16, fontFamily: "outfit-medium" }}>
                                    {item.properties.name ||
                                        item.properties.formatted}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#999",
                                        marginTop: 4,
                                        fontFamily: "outfit",
                                    }}
                                >
                                    {item.properties.formatted}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
}
