import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskType } from "../Task";

const storage = new Storage({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export default storage;

export const storeData = (tasks: TaskType[], completedTaskIds: string[]) => {
  storage.save({
    key: "tasks", // Note: Do not use underscore("_") in key!
    data: { tasks, completedTaskIds },
    expires: null, // it will never expire
  });
};

export const retrieveData = (): Promise<{
  tasks: TaskType[];
  completedTaskIds: string[];
}> => {
  return storage
    .load({
      key: "tasks",
      autoSync: true,
      syncInBackground: true,
    })
    .then((res) => res)
    .catch((err) => {
      console.warn(err.message);
      switch (err.name) {
        case "NotFoundError":
          // TODO;
          break;
        case "ExpiredError":
          // TODO
          break;
      }
    });
};
