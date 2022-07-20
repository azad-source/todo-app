import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { mainColor, mainTextColor, secondColor } from "./domain/colors";
import { contentFontSize } from "./domain/constants";

export type TaskType = {
  id: string;
  title: string;
};

interface Props {
  task: TaskType;
  onRemove: (id: string) => void;
  addToComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const Task: React.FC<Props> = ({
  task,
  onRemove,
  addToComplete,
  onEdit,
}) => {
  const styles = StyleSheet.create({
    task: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderWidth: 1,
      borderColor: !addToComplete ? secondColor : mainColor,
      borderRadius: 5,
      marginBottom: 10,
      overflow: "hidden",
      backgroundColor: !addToComplete ? secondColor : "#fff",
    },
    taskText: {
      fontSize: contentFontSize,
      textDecorationLine: !addToComplete ? "line-through" : "none",
      color: mainTextColor,
      maxWidth: "90%",
      marginLeft: 12,
    },
    remove: {
      marginLeft: "auto",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={!!onEdit ? () => onEdit(task.id) : undefined}
      // onLongPress={() => onRemove(task.id)}
    >
      <View style={styles.task}>
        {!!addToComplete ? (
          <TouchableOpacity onPress={() => addToComplete(task.id)}>
            <Icon name="ellipse-outline" type="ionicon" color={mainColor} />
          </TouchableOpacity>
        ) : (
          <Icon name="check" color={mainColor} />
        )}
        <Text style={styles.taskText}>{task.title}</Text>

        <TouchableOpacity
          onPress={() => onRemove(task.id)}
          style={styles.remove}
        >
          {!!addToComplete ? (
            <Icon name="trash" type="font-awesome" color={mainColor} />
          ) : (
            <Icon name="arrow-up-outline" type="ionicon" color={mainColor} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
