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

export default function App() {
  const [allTasks, setAllTasks] = React.useState<TaskType[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = React.useState<string[]>([]);

  const addTask = (title: string) => {
    if (
      allTasks.find(
        (task) => task.title.toLowerCase().trim() === title.toLowerCase().trim()
      )
    ) {
      Alert.alert("Такая задача уже есть в списке!");
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
