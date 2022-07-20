import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { mainColor } from "./domain/colors";
import { headerFontSize } from "./domain/constants";

interface Props {
  title: string;
  showAppInfo: () => void;
}

export const Navbar: React.FC<Props> = ({ title, showAppInfo }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={showAppInfo} style={styles.infoButton}>
        <Icon
          name="information-circle-outline"
          type="ionicon"
          color="#fff"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: mainColor,
    paddingBottom: 20,
  },
  text: {
    color: "white",
    fontSize: headerFontSize,
  },
  infoButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: headerFontSize,
  },
});
