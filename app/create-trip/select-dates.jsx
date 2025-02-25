import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment/moment";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function selectDates() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    const onDateChange = (date, type) => {
        console.log(date, type); //1
        if (type == "START_DATE") {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    };

    const onDateSelectionContinue = () => {
        if (!startDate && !endDate) {
            ToastAndroid.show(
                "Please select Start and End Date",
                ToastAndroid.LONG
            );
            return;
        }
        const totalNoOfDays = endDate.diff(startDate, "days");
        console.log(totalNoOfDays + 1); //But total no of nights is without +1   //1
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNoOfDays: totalNoOfDays + 1,
        });
        router.push("/create-trip/select-budget");
    };

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
                Travel Dates
            </Text>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={5}
                    selectedRangeStyle={{
                        backgroundColor: "#000",
                    }}
                    selectedDayTextStyle={{
                        color: "#fff",
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={onDateSelectionContinue}
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
