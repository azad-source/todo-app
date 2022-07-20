import * as React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Alert,
  Text,
} from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { TaskType, Task } from "./src/Task";
import { mainColor, mainTextColor, secondColor } from "./src/domain/colors";
import { contentFontSize, titleFontSize } from "./src/domain/constants";
import { TaskEditModal } from "./src/components/TaskEditModal";
import { retrieveData, storeData } from "./src/domain/storage";
import { AppInfoModal } from "./src/components/AppInfoModal";

export default function App() {
  const [allTasks, setAllTasks] = React.useState<TaskType[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = React.useState<string[]>([]);
  const [showTaskEditModal, setShowTaskEditModal] =
    React.useState<boolean>(false);
  const [selectedTask, setSelectedTask] = React.useState<TaskType>(null);
  const [showAppInfoModal, setShowAppInfoModal] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    retrieveData().then((res) => {
      setAllTasks(res.tasks);
      setCompletedTaskIds(res.completedTaskIds);
    });
  }, []);

  React.useEffect(() => {
    storeData([...allTasks], [...completedTaskIds]);
  }, [allTasks, completedTaskIds]);

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

  const addTask = (task: TaskType) => {
    if (isTaskExist(task.title)) return;
    setAllTasks((prev) => [...prev, task]);
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
      <Navbar title="Задачи" showAppInfo={() => setShowAppInfoModal(true)} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        <AddTodo onCreate={addTask} />

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

      {showAppInfoModal && (
        <AppInfoModal onClose={() => setShowAppInfoModal(false)} />
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
