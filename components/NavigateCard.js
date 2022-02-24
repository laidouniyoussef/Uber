import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
