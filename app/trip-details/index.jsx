import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";
import { getRelevantImage, getPlaceholderImage } from "../../services/ImageService";

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState(null);
    const [headerImage, setHeaderImage] = useState(getPlaceholderImage());

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });

        try {
            const parsedTrip = JSON.parse(trip);
            setTripDetails(parsedTrip);

            // Fetch destination image
            const fetchHeaderImage = async () => {
                try {
                    const tripData = JSON.parse(parsedTrip.tripData);
                    const location = tripData?.locationInfo?.name;
                    if (location) {
                        const url = await getRelevantImage({
                            name: location,
                            location,
                            type: "destination",
                        });
                        setHeaderImage(url);
                    }
                } catch (err) {
                    console.error("Error fetching header image:", err);
                }
            };
            fetchHeaderImage();
        } catch (error) {
            console.error("Failed to parse trip data:", error);
        }
    }, [trip]);

    if (!tripDetails) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const formatData = (data) => {
        return JSON.parse(data);
    };

    return (
        <ScrollView>
            <Image
                source={{ uri: headerImage }}
                style={{
                    width: "100%",
                    height: 280,
                    backgroundColor: "#f0f0f0",
                }}
            />
            <View
                style={{
                    padding: 15,
                    backgroundColor: "#fff",
                    height: "100%",
                    marginTop: -30,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        fontFamily: "outfit-bold",
                    }}
                >
                    {tripDetails?.tripPlan.location}
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 18,
                            color: "#7C7C7C",
                        }}
                    >
                        {moment(
                            formatData(tripDetails.tripData).startDate
                        ).format("DD MMM yyyy")}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "outfit",
                            fontSize: 18,
                            color: "#7C7C7C",
                        }}
                    >
                        -{" "}
                        {moment(
                            formatData(tripDetails.tripData).endDate
                        ).format("DD MMM yyyy")}
                    </Text>
                </View>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 17,
                        color: "#7C7C7C",
                    }}
                >
                    🚌 {formatData(tripDetails.tripData).traveler?.title}
                </Text>
                {/* Flight Info */}
                <FlightInfo flightData={tripDetails?.tripPlan?.flightDetails} />
                {/* Hotels List */}
                <HotelList
                    hotelList={tripDetails?.tripPlan?.hotelOptions}
                    location={tripDetails?.tripPlan?.location}
                />
                {/* Trip Day Planner Info */}
                <PlannedTrip
                    details={
                        tripDetails?.tripPlan?.itinerary ||
                        tripDetails?.tripPlan?.dailyPlan ||
                        tripDetails?.tripPlan?.dayPlan ||
                        tripDetails?.tripPlan?.Itinerary
                    }
                    location={tripDetails?.tripPlan?.location}
                />
            </View>
            {/* <View>

      </View> */}
        </ScrollView>
    );
}
