import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../services/GooglePlaceApi";

export default function HotelCard({ item }) {
    const [photoRef, setPhotoRef] = useState(null);

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.hotelName);
        const photoReference = result?.results[0]?.photos[0]?.photo_reference;
        // console.log(photoReference);//1
        setPhotoRef(photoReference);
    };

    return (
        <View
            style={{
                marginRight: 20,
                width: 180,
            }}
        >
            {photoRef ? (
                <Image
                    source={{
                        uri:
                            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                            photoRef +
                            "&key=" +
                            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    }}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                    }}
                />
            ) : (
                <View
                    style={{
                        width: 180,
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
                    padding: 5,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit-medium",
                        fontSize: 17,
                    }}
                >
                    {item?.hotelName}
                </Text>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "outfit",
                        }}
                    >
                        ⭐ {item?.rating}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "outfit",
                        }}
                    >
                        💰 {item?.pricePerNight}/night
                    </Text>
                </View>
            </View>
        </View>
    );
}
