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

export default function SignUp() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const onCreateAccount = async () => {
        if (!email || !password || !fullName) {
            ToastAndroid.show("Please enter all details!", ToastAndroid.LONG);
            return;
        }

        try {
            const { auth } = await initFirebase();
            if (!auth) {
                ToastAndroid.show("Firebase not configured properly", ToastAndroid.LONG);
                return;
            }
            const result = await auth.createUserWithEmailAndPassword(email, password);
            console.log('Sign up successful:', result.user.email);
            router.replace("/(tabs)/mytrip");
        } catch (error) {
            console.error('Sign up error:', error);
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                ToastAndroid.show("Email already in use", ToastAndroid.LONG);
            } else if (errorCode === "auth/weak-password") {
                ToastAndroid.show("Password is too weak", ToastAndroid.LONG);
            } else if (errorCode === "auth/invalid-email") {
                ToastAndroid.show("Invalid email format", ToastAndroid.LONG);
            } else {
                ToastAndroid.show(error.message || "Sign-up failed", ToastAndroid.LONG);
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
                Create New Account{" "}
            </Text>
            {/* User Full Name */}
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
                    Full Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Full Name"
                    onChangeText={(value) => setFullName(value)}
                />
            </View>

            {/* Email */}
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
                onPress={onCreateAccount}
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
                    Create Account
                </Text>
            </TouchableOpacity>

            {/* Create Account Button*/}
            <TouchableOpacity
                onPress={() => router.replace("auth/sign-in")}
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
                    Sign In
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
