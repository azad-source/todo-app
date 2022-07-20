import * as React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Alert,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { TaskType, Task } from "./src/Task";
import {
  errorBgColor,
  mainColor,
  mainTextColor,
  secondColor,
} from "./src/domain/colors";
import { contentFontSize, titleFontSize } from "./src/domain/constants";
import { Icon } from "react-native-elements";

export default function App() {
  const [allTasks, setAllTasks] = React.useState<TaskType[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = React.useState<string[]>([]);
  const [showTaskEditModal, setShowTaskEditModal] =
    React.useState<boolean>(false);
  const [selectedTask, setSelectedTask] = React.useState<TaskType>(null);

  const isTaskExist = (title: string) => {
    if (
      allTasks.find(
        (task) => task.title.toLowerCase().trim() === title.toLowerCase().trim()
      )
    ) {
      Alert.alert("Такая задача уже есть в списке!");
      return true;
    }
  };

  const addTask = (title: string) => {
    if (isTaskExist(title)) {
      return;
    }

    setAllTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const removeTask = (id: string) => {
    setAllTasks((prev) => prev.filter((todo) => todo.id !== id));
    if (showTaskEditModal) setShowTaskEditModal(false);
  };

  const addTaskToComplete = (id: string) => {
    if (!completedTaskIds.includes(id)) {
      setCompletedTaskIds((prev) => [...prev, id]);
    }
  };

  const removeTaskFromComplete = (id: string) => {
    setCompletedTaskIds((prev) => prev.filter((task) => task !== id));
  };

  const actualTasks = allTasks.filter(
    ({ id }) => !completedTaskIds.includes(id)
  );
  const completedTasks = allTasks.filter(({ id }) =>
    completedTaskIds.includes(id)
  );

  const editTask = (id: string, title: string) => {
    if (isTaskExist(title)) {
      return;
    }

    setAllTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          const editedTask = { ...task };
          editedTask.title = title;
          return editedTask;
        }
        return task;
      });
    });
    setShowTaskEditModal(false);
  };

  const openTaskEditModal = (id: string) => {
    setSelectedTask(allTasks.find((task) => task.id === id));
    setShowTaskEditModal(true);
  };

  return (
    <View>
      <Navbar title="Задачи" />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        <AddTodo onSubmit={addTask} />

        <Text style={styles.title}>Актуальные</Text>

        {actualTasks.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={actualTasks}
            renderItem={({ item }) => (
              <Task
                task={item}
                onRemove={removeTask}
                addToComplete={addTaskToComplete}
                onEdit={openTaskEditModal}
              />
            )}
          />
        ) : (
          <Text style={styles.emptyListTitle}>Список пуст</Text>
        )}

        {completedTaskIds.length > 0 && (
          <>
            <View
              style={{
                borderBottomColor: secondColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: 16,
              }}
            />
            <Text style={styles.title}>Завершенные</Text>
            <FlatList
              keyExtractor={(item) => item.id}
              data={completedTasks}
              renderItem={({ item }) => (
                <Task task={item} onRemove={removeTaskFromComplete} />
              )}
            />
          </>
        )}
      </View>

      {showTaskEditModal && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setShowTaskEditModal(false)}
          onSaveTask={editTask}
          onRemove={removeTask}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: titleFontSize,
    marginBottom: 10,
    fontWeight: "700",
    color: mainTextColor,
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  emptyListTitle: {
    fontSize: contentFontSize,
    color: secondColor,
    textAlign: "center",
  },
});

interface TaskEditModalProps {
  task: TaskType;
  onSaveTask: (id: string, title: string) => void;
  onClose: () => void;
  onRemove: (id: string) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
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
      marginBottom: 15,
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
