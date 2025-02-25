import { View, Text } from "react-native";
import React from "react";

export default function OptionCard({ option, selectedOption }) {
    return (
        <View
            style={[
                {
                    padding: 25,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#f2f2f2",
                    borderRadius: 15,
                },
                selectedOption?.id == option?.id && {
                    borderWidth: 3,
                    borderColor: "black",
                },
            ]}
        >
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "outfit-bold",
                    }}
                >
                    {option?.title}
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontFamily: "outfit",
                        color: "gray",
                    }}
                >
                    {option?.desc}
                </Text>
            </View>
            <Text
                style={{
                    fontSize: 40,
                }}
            >
                {option?.icon}
            </Text>
        </View>
    );
}
