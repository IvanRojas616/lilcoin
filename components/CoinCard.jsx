import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const euroSignUnicode = "\u20AC";

const CoinCard = ({ name, urlImage, price, symbol, behavior }) => {
  return (
    <View style={styles.configView}>
      <View style={{ flexDirection: "row", marginRight: 2 }}>
        <Image style={styles.icon} source={{ uri: urlImage }} />
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.textSymbol}>{symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{euroSignUnicode + " " + price}</Text>
        <MaterialCommunityIcons
          name="chart-line-variant"
          size={24}
          color={behavior >= 0 ? "green" : "red"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  configView: {
    backgroundColor: "#343537",
    borderRadius: 5,
    margin: 1,
    padding: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  text: {
    color: "#b0c4de",
  },
  priceText: {
    color: "#b0c4de",
    marginHorizontal: 10,
    textAlign: "right",
  },
  textSymbol: {
    color: "#686869",
    textTransform: "uppercase",
    marginLeft: 3,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CoinCard;
