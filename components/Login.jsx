import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    return (
        <View>
            <Image
                style={{
                    width: "100%",
                    height: 520,
                }}
                source={require("./../assets/images/trip-planning.png")}
            />

            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 30,
                        fontFamily: "outfit-bold",
                        textAlign: "center",
                        padding: 10,
                    }}
                >
                    AI Travel Planner
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        textAlign: "center",
                        color: "#777",
                        marginTop: 10,
                        fontFamily: "outfit",
                        marginTop: 20,
                    }}
                >
                    "Discover a smarter way to plan and organize with AI Planner
                    – your intelligent assistant for effortless productivity!"
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("auth/sign-in")}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 17,
                            fontFamily: "outfit",
                        }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: -20,
        height: "100%",
        padding: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 25,
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 99,
        marginTop: "20%",
    },
});
