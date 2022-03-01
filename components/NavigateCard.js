import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/* <Text style={tw`text-center py-5 text-xl`}> HELLOOOO </Text> */}
      <View>
        {/* style={tw`border-t border-gray-200 flex-shrink`} */}
        <View>
          <GooglePlacesAutocomplete
            placeholder="Fin ?"
            styles={styles}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
            returnKeyType={"search"}
            fetchDetails={true}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEYS,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex flex-row bg-white  justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-gray-700 w-24 px-4 py-3 rounded-full ${
            !destination && "bg-gray-400"
          }`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}> Rides </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row bg-gray-200 justify-between w-24 px-4 py-3 rounded-full ${
            !destination && "bg-gray-100"
          }`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}> Eats </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 0,
    paddingTop: 20,
  },
  textInput: {
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "#DDDDDF",
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
