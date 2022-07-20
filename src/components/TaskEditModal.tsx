import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TaskType, Task } from "../Task";
import { errorBgColor, mainColor, secondColor } from "../domain/colors";
import { contentFontSize, titleFontSize } from "../domain/constants";
import { Icon } from "react-native-elements";

interface Props {
  task: TaskType;
  onSaveTask: (id: string, title: string) => void;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const TaskEditModal: React.FC<Props> = ({
  task,
  onSaveTask,
  onClose,
  onRemove,
}) => {
  const [taskTitle, setTaskTitle] = React.useState<string>(task.title);

  const canSaveTask = !!taskTitle.trim();

  const styles = StyleSheet.create({
    centeredView: {
      width: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalView: {
      minWidth: "90%",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 16,
      padding: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalTitle: {
      marginBottom: 30,
      fontSize: titleFontSize,
      fontWeight: "700",
    },
    modalInput: {
      minWidth: "100%",
      padding: 10,
      borderBottomColor: mainColor,
      borderStyle: "solid",
      borderBottomWidth: 2,
      fontSize: contentFontSize,
    },
    modalBottomPanel: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
    },
    modalButton: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 8,
      fontSize: contentFontSize,
      color: "#fff",
    },
    saveButton: {
      backgroundColor: canSaveTask ? mainColor : secondColor,
    },
    removeButton: {
      backgroundColor: errorBgColor,
    },
    cancelButton: {
      color: mainColor,
    },
    closeButton: {
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 10,
      elevation: 2,
      backgroundColor: secondColor,
      position: "absolute",
      top: 20,
      right: 20,
    },
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => onClose()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Редактирование задачи</Text>
            <TextInput
              style={styles.modalInput}
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="Опишите задачу"
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor={secondColor}
              maxLength={100}
            />
            <View style={styles.modalBottomPanel}>
              <TouchableOpacity
                onPress={() => onSaveTask(task.id, taskTitle)}
                disabled={!canSaveTask}
              >
                <Text style={[styles.modalButton, styles.saveButton]}>
                  Сохранить
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onRemove(task.id)}
                disabled={!canSaveTask}
              >
                <Text style={[styles.modalButton, styles.removeButton]}>
                  Удалить
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text style={[styles.modalButton, styles.cancelButton]}>
                  Отменить
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]}
              onPress={onClose}
            >
              <Icon name="close" type="ionicon" color={mainColor} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
