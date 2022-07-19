import * as React from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { mainColor, secondColor } from "./domain/colors";
import { contentFontSize } from "./domain/constants";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = React.useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Название дела не может быть пустым");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Введите название дела"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={secondColor}
        // keyboardType="numeric"
      />
      <TouchableOpacity onPress={pressHandler}>
        <Text style={styles.addButton}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderBottomColor: mainColor,
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: contentFontSize,
  },
  addButton: {
    backgroundColor: mainColor,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: contentFontSize
  }
});
