import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { initFirebase } from "./../../../configs/FirebaseConfig";

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const onSignIn = async () => {
        if (!email || !password) {
            ToastAndroid.show(
                "Please Enter Email and Password",
                ToastAndroid.LONG
            );
            return;
        }
        try {
            const { auth } = await initFirebase();
            if (!auth) {
                ToastAndroid.show("Firebase not configured properly", ToastAndroid.LONG);
                return;
            }
            const result = await auth.signInWithEmailAndPassword(email, password);
            console.log('Sign in successful:', result.user.email);
            router.replace("/(tabs)/mytrip");
        } catch (error) {
            console.error('Sign in error:', error);
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
                ToastAndroid.show("Incorrect email or password. Please try again.", ToastAndroid.LONG);
            } else if (errorCode === "auth/user-not-found") {
                ToastAndroid.show("No account found with this email", ToastAndroid.LONG);
            } else if (errorCode === "auth/invalid-email") {
                ToastAndroid.show("Invalid email format", ToastAndroid.LONG);
            } else if (errorCode === "auth/too-many-requests") {
                ToastAndroid.show("Too many failed attempts. Try again later.", ToastAndroid.LONG);
            } else {
                ToastAndroid.show("Sign-in failed. Please check your credentials.", ToastAndroid.LONG);
            }
        }
    };

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 20,
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 30,
                    marginTop: 30,
                }}
            >
                {" "}
                Let's sign you In{" "}
            </Text>
            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 30,
                    marginTop: 20,
                    color: "#7C7C7C",
                }}
            >
                Welcome Back!
            </Text>
            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 30,
                    marginTop: 10,
                    color: "#7C7C7C",
                }}
            >
                You've been missed!
            </Text>

            {/* Email */}
            <View
                style={{
                    marginTop: 50,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit",
                    }}
                >
                    Email
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    onChangeText={(value) => setEmail(value)}
                ></TextInput>
            </View>

            {/* Password */}
            <View
                style={{
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: "outfit",
                    }}
                >
                    Password
                </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={(value) => setPassword(value)}
                ></TextInput>
            </View>

            {/* Sign in Button */}
            <TouchableOpacity
                onPress={onSignIn}
                style={{
                    backgroundColor: "#000",
                    padding: 20,
                    borderRadius: 15,
                    marginTop: 50,
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 17,
                        fontFamily: "outfit",
                    }}
                >
                    Sign In
                </Text>
            </TouchableOpacity>

            {/* Create Account Button*/}
            <TouchableOpacity
                onPress={() => router.replace("auth/sign-up")}
                style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 15,
                    marginTop: 20,
                    borderWidth: 1,
                }}
            >
                <Text
                    style={{
                        color: "#000",
                        textAlign: "center",
                        fontSize: 17,
                        fontFamily: "outfit",
                    }}
                >
                    Create Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#7C7C7C",
        fontFamily: "outfit",
    },
});
