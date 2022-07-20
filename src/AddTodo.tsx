import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { mainColor, secondColor } from "./domain/colors";
import { contentFontSize } from "./domain/constants";
import { TaskType } from "./Task";

interface Props {
  onCreate: (task: TaskType) => void;
}

export const AddTodo: React.FC<Props> = ({ onCreate }) => {
  const [taskTitle, setTaskTitle] = React.useState("");

  const pressHandler = () => {
    if (taskTitle.trim()) {
      onCreate({ id: Date.now().toString(), title: taskTitle });
      setTaskTitle("");
      Keyboard.dismiss();
    }
  };

  const canAddTask = !!taskTitle.trim();

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
      backgroundColor: canAddTask ? mainColor : secondColor,
      color: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 8,
      fontSize: contentFontSize,
    },
  });

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Опишите задачу"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={secondColor}
        maxLength={100}
      />
      <TouchableOpacity onPress={pressHandler} disabled={!canAddTask}>
        <Text style={styles.addButton}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
};
