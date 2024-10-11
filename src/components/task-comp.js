import axios from "axios";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { apiPath } from "../../utils/routes";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import moment from "moment";
const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      key={item._id}
      onPress={() => navigation.navigate("Task Details", { taskId: item._id })}
    >
      <View
        key={item._id}
        style={
          item.taskPriority == "High"
            ? styles.orange
            : item.taskPriority == "Urgent"
            ? styles.red
            : item.taskPriority == "Medium"
            ? styles.yellow
            : styles.blue
        }
      >
        <Text numberOfLines={1} style={styles.title}>
          {item.description}
        </Text>
        <View style={styles.bottomInfo}>
          <Text style={styles.status}>{item.taskStatus}</Text>
          <Text style={styles.dueDate}>
            {moment(item.dueDate).format("MM-DD-YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function TaskComponent({ user, navigation }) {
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_800ExtraBold,
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserTasks();
  }, []);
  const getUserTasks = () => {
    setLoading(true);
    try {
      axios
        .get(`${apiPath.prodPath}/api/users/${user.fullname}`)
        .then((res) => {
          setLoading(false);
          const allUserTask = res.data.allUsers[0].userTasks;
          setTasks(allUserTask);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {tasks.length ? (
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <Item navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.notFound}>No Tasks are assigned to you</Text>
        )}
      </SafeAreaView>
    );
  }
}

export default TaskComponent;
const styles = StyleSheet.create({
  notFound: {
    color: "#fff",
    fontFamily: "Manrope_300Light",
    fontSize: 24,
    marginTop: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  blue: {
    backgroundColor: "#7CB9E8",
    marginTop: 10,
    marginBottom: 10,
    height: 70,
    borderRadius: 10,
    padding: 10,
  },
  orange: {
    backgroundColor: "orange",
    marginTop: 10,
    marginBottom: 10,
    height: 70,
    borderRadius: 10,
    padding: 10,
  },
  yellow: {
    backgroundColor: "yellow",
    marginTop: 10,
    marginBottom: 10,
    height: 70,
    borderRadius: 10,
    padding: 10,
  },
  red: {
    backgroundColor: "#E44D2E",
    marginTop: 10,
    marginBottom: 10,
    height: 70,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    color: "#000",
    fontFamily: "Manrope_300Light",
    fontSize: 18,
  },
  bottomInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  status: {
    fontFamily: "Manrope_600SemiBold",
  },
  dueDate: {
    fontFamily: "Manrope_600SemiBold",
  },
});
