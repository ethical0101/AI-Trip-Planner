import { View } from "react-native";
import React, { useContext, useEffect } from "react";
import "react-native-get-random-values";
import { useNavigation, useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "./../../context/CreateTripContext";

// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocatiom = require('react-native-geolocation-service');

export default function SearchPlace() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Discover",
        });
    }, []);

    //   useEffect(() => {
    //     console.log(tripData);  //1
    //   },[tripData])

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 55,
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <GooglePlacesAutocomplete
                placeholder="Search Place"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    //   'details' is provided when fetchDetails = true
                    //   console.log(data.description);
                    //   console.log(details?.geometry.location);
                    //   console.log(details?.photos[0].photo_reference);
                    //   console.log(details?.url);

                    setTripData({
                        locationInfo: {
                            name: data.description,
                            coordinates: details?.geometry.location,
                            photoRef: details?.photos[0].photo_reference,
                            url: details?.url,
                        },
                    });

                    router.push("/create-trip/select-traveler");
                }}
                query={{
                    key: "process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY",
                    language: "en",
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: "#f5f5f5",
                        borderWidth: 2,
                        borderRadius: 10,
                        marginTop: 25,
                    },
                }}
            />
        </View>
    );
}
