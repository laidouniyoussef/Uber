import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
import tw from "twrnc";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destinationGeo: {
      lat: 35.7744015,
      lng: -5.804073199999999,
    },
    destination:
      "Lycée Technique Moulay Youssef, Avenue Imam Ibn Taymya, Tanger, Morocco",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destinationGeo: {
      lat: 35.77598529999999,
      lng: -5.8030734,
    },
    destination: "Tingis Web, Bureau T104, Avenue Mohammed V, Tangier, Morocco",
  },
];

const NavFavorites = () => {
  const navigation = useNavigation();
  const [selectedFav, setSelectedFav] = useState(null);
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]} />
      )}
      renderItem={({
        item: { id, icon, location, destination, destinationGeo },
      }) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setOrigin({
                location: destinationGeo,
                description: destination,
              })
            );
            setSelectedFav(id);
          }}
          style={tw`flex-row items-center p-4 ${
            id === selectedFav && "bg-gray-200 rounded"
          }`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg `}>{location}</Text>
            <Text style={tw`text-gray-500 mr-15`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
const styles = StyleSheet.create({
  // text: {
  //   break-normal ,
  //  },
});
