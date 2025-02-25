import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";

export default function ReviewTrip() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 45,
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 35,
                    marginTop: 20,
                }}
            >
                Review your Trip
            </Text>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit-bold",
                        fontSize: 20,
                    }}
                >
                    Before generating your trip , please review your selection
                </Text>
                {/* Destination Info */}
                <View
                    style={{
                        marginTop: 40,
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        paddingRight: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                        }}
                    >
                        📍
                    </Text>
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 20,
                                color: "#7C7C7C",
                            }}
                        >
                            Destination
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                            }}
                        >
                            {tripData?.locationInfo?.name}
                        </Text>
                    </View>
                </View>
                {/* Date Selected Info */}
                <View
                    style={{
                        marginTop: 25,
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        paddingRight: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                        }}
                    >
                        🗓️
                    </Text>
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 20,
                                color: "#7C7C7C",
                            }}
                        >
                            Travel Date
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                            }}
                        >
                            {moment(tripData?.startDate).format("DD MMM") +
                                "  To  " +
                                moment(tripData?.endDate).format("DD MMM") +
                                "  "}
                            ( {tripData?.totalNoOfDays} days )
                        </Text>
                    </View>
                </View>
                {/* Traveler Info */}
                <View
                    style={{
                        marginTop: 25,
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        paddingRight: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                        }}
                    >
                        🚐
                    </Text>
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 20,
                                color: "#7C7C7C",
                            }}
                        >
                            Who is Traveling
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                            }}
                        >
                            {tripData?.traveler?.title}
                        </Text>
                    </View>
                </View>
                {/* Budget Info */}
                <View
                    style={{
                        marginTop: 25,
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                        }}
                    >
                        💰
                    </Text>
                    <View>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 20,
                                color: "#7C7C7C",
                            }}
                        >
                            Budget
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                            }}
                        >
                            {tripData?.budget}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => router.replace("/create-trip/generate-trip")}
                style={{
                    padding: 15,
                    backgroundColor: "#000",
                    borderRadius: 15,
                    marginTop: 80,
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        fontFamily: "outfit-medium",
                        fontSize: 20,
                    }}
                >
                    Build My Trip
                </Text>
            </TouchableOpacity>
        </View>
    );
}
