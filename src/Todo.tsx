import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { mainColor, mainTextColor } from "./domain/colors";
import { contentFontSize } from "./domain/constants";

export type TaskType = {
  id: string;
  title: string;
};

interface Props {
  task: TaskType;
  onRemove: (id: string) => void;
  addToComplete?: (id: string) => void;
}

export const Task: React.FC<Props> = ({ task, onRemove, addToComplete }) => {
  const styles = StyleSheet.create({
    task: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderWidth: 1,
      borderColor: mainColor,
      borderRadius: 5,
      marginBottom: 10,
      overflow: 'hidden'
    },
    taskText: {
      fontSize: contentFontSize,
      textDecorationLine: !addToComplete ? "line-through" : "none",
      color: mainTextColor,
      maxWidth: '90%'
    },
    circle: {
      borderWidth: 1,
      borderColor: mainColor,
      borderRadius: 10,
      width: 20,
      height: 20,
      marginRight: 12,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log("Pressed", task.id)}
      onLongPress={() => onRemove(task.id)}
    >
      <View style={styles.task}>
        {!!addToComplete && (
          <TouchableOpacity
            onPress={() => addToComplete(task.id)}
            style={styles.circle}
          />
        )}
        <Text style={styles.taskText}>{task.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
