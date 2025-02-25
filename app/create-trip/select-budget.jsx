import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SelectBudgetOptions } from "../../context/Options";
import OptionCard from "./../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";
export default function SelectBudget() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);
    useEffect(() => {
        selectedOption &&
            setTripData({
                ...tripData,
                budget: selectedOption?.title,
            });
    }, [selectedOption]);

    const onClickContinue = () => {
        if (!selectedOption) {
            ToastAndroid.show("Select your Budget", ToastAndroid.LONG);
            return;
        }
        router.push("/create-trip/review-trip");
    };

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 55,
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
                Budget
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
                    Choose spending habits for your trip
                </Text>

                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedOption(item)}
                            style={{
                                marginVertical: 10,
                            }}
                        >
                            <OptionCard
                                option={item}
                                selectedOption={selectedOption}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity
                onPress={() => onClickContinue()}
                style={{
                    padding: 15,
                    backgroundColor: "#000",
                    borderRadius: 15,
                    marginTop: 20,
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
            </TouchableOpacity>
        </View>
    );
}
