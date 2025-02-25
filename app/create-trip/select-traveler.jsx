import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { SelectTravelerList } from "./../../context/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function selectTraveler() {
    const navigation = useNavigation();

    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    useEffect(() => {
        setTripData({ ...tripData, traveler: selectedTraveler });
    }, [selectedTraveler]);

    useEffect(() => {
        console.log(tripData); //1
    }, [tripData]);

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
                    fontSize: 35,
                    fontFamily: "outfit-bold",
                    marginTop: 20,
                }}
            >
                Who's Travelling
            </Text>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 23,
                        fontFamily: "outfit-bold",
                    }}
                >
                    Choose your Traveler
                </Text>
                <FlatList
                    data={SelectTravelerList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveler(item)}
                            style={{
                                marginVertical: 10,
                            }}
                        >
                            <OptionCard
                                option={item}
                                selectedOption={selectedTraveler}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: "#000",
                    borderRadius: 15,
                    marginTop: 20,
                }}
            >
                <Link
                    href={"/create-trip/select-dates"}
                    style={{
                        width: "100%",
                        textAlign: "center",
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
                        Continue
                    </Text>
                </Link>
            </TouchableOpacity>
        </View>
    );
}
