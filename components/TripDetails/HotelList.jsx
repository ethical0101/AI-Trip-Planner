import { View, Text, FlatList } from "react-native";
import HotelCard from "./HotelCard";

export default function HotelList({ hotelList }) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                🏨 Hotel Recommendations
            </Text>

            <FlatList
                style={{
                    marginTop: 8,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={hotelList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <HotelCard item={item} />}
            />
        </View>
    );
}
