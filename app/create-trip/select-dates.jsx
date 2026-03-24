import { View, Text, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import moment from "moment/moment";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectDates() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: false, // Make header solid
            headerTitle: "",
        });
    }, []);

    const getDaysArray = () => {
        const days = [];
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        let day = startOfMonth;

        while (day <= endOfMonth) {
            days.push(day.clone());
            day.add(1, 'day');
        }
        return days;
    };

    const isDateSelected = (date) => {
        if (!startDate || !endDate) return false;
        return date.isBetween(startDate, endDate, null, '[]');
    };

    const handleDateSelect = (date) => {
        if (!startDate) {
            setStartDate(date);
        } else if (!endDate) {
            if (date.isAfter(startDate)) {
                setEndDate(date);
            } else {
                setStartDate(date);
                setEndDate(null);
            }
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const onDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show(
                "Please select Start and End Date",
                ToastAndroid.LONG
            );
            return;
        }
        const totalNoOfDays = endDate.diff(startDate, "days");
        console.log(totalNoOfDays + 1);
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNoOfDays: totalNoOfDays + 1,
        });
        router.push("/create-trip/select-budget");
    };

    const days = getDaysArray();
    const daysInWeeks = [];
    for (let i = 0; i < days.length; i += 7) {
        daysInWeeks.push(days.slice(i, i + 7));
    }

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 50, // Increase padding to avoid header overlay
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

            {startDate && (
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 16,
                        marginTop: 20,
                        color: "#7C7C7C",
                    }}
                >
                    Start: {startDate.format('MMM DD, YYYY')}
                    {endDate && ` → End: ${endDate.format('MMM DD, YYYY')}`}
                </Text>
            )}

            <ScrollView
                style={{
                    marginTop: 20,
                    marginBottom: 20,
                }}
            >
                {daysInWeeks.map((week, weekIndex) => (
                    <View
                        key={weekIndex}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}
                    >
                        {week.map((day, dayIndex) => {
                            const isSelected = isDateSelected(day);
                            const isStartOrEnd =
                                (startDate && day.isSame(startDate, 'day')) ||
                                (endDate && day.isSame(endDate, 'day'));
                            const isBeforeToday = day.isBefore(moment(), 'day');

                            return (
                                <TouchableOpacity
                                    key={dayIndex}
                                    onPress={() => !isBeforeToday && handleDateSelect(day)}
                                    disabled={isBeforeToday}
                                    style={{
                                        width: '13%',
                                        padding: 10,
                                        backgroundColor: isStartOrEnd
                                            ? '#000'
                                            : isSelected
                                            ? '#e0e0e0'
                                            : isBeforeToday
                                            ? '#f5f5f5'
                                            : '#fff',
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        borderWidth: isBeforeToday ? 0 : 1,
                                        borderColor: isBeforeToday ? 'transparent' : '#ddd',
                                        opacity: isBeforeToday ? 0.5 : 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'outfit',
                                            fontSize: 12,
                                            color: isStartOrEnd ? '#fff' : '#000',
                                        }}
                                    >
                                        {day.format('D')}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>

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
