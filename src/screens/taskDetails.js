import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";

import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import BackBtn from "../../assets/back-button.png";
import Menu from "../../assets/menu.png";
import moment from "moment";
import axios from "axios";
import { apiPath } from "../../utils/routes";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import SubTask from "../components/task-components/subtask";
import Notes from "../components/task-components/notes";
import Attachments from "../components/task-components/attachments";

function TaskDetails({ route, navigation }) {
  const { taskId } = route.params;
  const [task, setTask] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeLink, setActiveLink] = useState("Sub Task");
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    getTask();
  }, []);
  const getTask = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/task/getTaskById/?taskId=${taskId}`)
      .then((res) => {
        setLoader(false);
        console.log(res.data.allTasks[0]);
        setTask(res.data.allTasks[0]);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  const handleNavigation = () => {
    navigation.navigate("Home");
  };
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  } else {
    return loader ? (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size="giant" />
      </ScrollView>
    ) : (
      <ScrollView
        style={
          task.taskPriority == "High"
            ? styles.orange
            : task.taskPriority == "Urgent"
            ? styles.red
            : task.taskPriority == "Medium"
            ? styles.yellow
            : styles.blue
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <StatusBar style="light" backgroundColor="black" />
        <View>
          <View style={styles.categoryWrap}>
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                source={BackBtn}
                alt="Back"
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleDropdown}>
        <Image
          source={Menu}
          alt="Menu"
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity> */}
            {
              //dropdownFlag ? (
              // <View style={styles.dropdown}>
              //   {/* {taskData.status ? null : (
              //     <TouchableOpacity
              //       onPress={() => actionHandler("edit", taskId)}
              //     >
              //       <Text style={styles.listText}>Edit</Text>
              //     </TouchableOpacity>
              //   )} */}
              //   <TouchableOpacity
              //     onPress={() => actionHandler("delete", taskId)}
              //   >
              //     <Text style={styles.listText}>Delete</Text>
              //   </TouchableOpacity>
              // </View>
              // ) : null
            }
          </View>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.mainHead}>{user.fullname}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.rowWrap}>
            <View style={styles.col1}>
              <Text style={styles.label}>Task Priority:</Text>
              <Text style={styles.valueText}>{task.taskPriority}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.label}>Task Status:</Text>
              <Text style={styles.valueText}>{task.taskStatus}</Text>
            </View>
          </View>
          <View style={styles.rowWrap}>
            <View style={styles.col1}>
              <Text style={styles.label}>Assigned By:</Text>
              <Text style={styles.valueText}>{task.user}</Text>
            </View>
          </View>
          {task &&
          task.selectedModule &&
          task.selectedModule !== null &&
          task.selectedModule.length ? (
            <View style={styles.rowWrap}>
              <View style={styles.col1}>
                <Text style={styles.label}>Selected Modules:</Text>
                <Text style={styles.valueText}>
                  {task.selectedModule.map((i, ind) => {
                    return task.selectedModule.length > ind ? i : `${i}, `;
                  })}
                </Text>
              </View>
            </View>
          ) : null}
          {task &&
          task.moduleArr &&
          task.moduleArr[0] !== null &&
          task.moduleArr[0].length ? (
            <View style={styles.rowWrap}>
              <View style={styles.col1}>
                <Text style={styles.label}>Modules:</Text>
                <Text style={styles.valueText}>
                  {task.moduleArr[0].map((i, ind) => {
                    return task.selectedModule.length > ind
                      ? `${i.label}(${i.selectedModule})`
                      : `${i.label}(${i.selectedModule}), `;
                  })}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.rowWrap2}>
            <View style={styles.col2}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.valueText}>
                {moment(task.dueDate).format("MM-DD-YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.tabWrap}>
            <TouchableOpacity onPress={() => setActiveLink("Sub Task")}>
              <Text
                style={
                  activeLink == "Sub Task" ? styles.activeTab : styles.simpleTab
                }
              >
                Sub Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveLink("Notes")}>
              <Text
                style={
                  activeLink == "Notes" ? styles.activeTab : styles.simpleTab
                }
              >
                Notes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveLink("Attachments")}>
              <Text
                style={
                  activeLink == "Attachments"
                    ? styles.activeTab
                    : styles.simpleTab
                }
              >
                Attachments
              </Text>
            </TouchableOpacity>
          </View>
          {activeLink == "Sub Task" ? (
            <SubTask subTasks={task.subTasks} />
          ) : null}
          {activeLink == "Notes" ? <Notes notes={task.notes} /> : null}
          {activeLink == "Attachments" ? (
            <Attachments attachments={task.attachments} />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default TaskDetails;
const styles = StyleSheet.create({
  blue: {
    backgroundColor: "#7CB9E8",
    padding: 10,
  },
  orange: {
    backgroundColor: "orange",
    padding: 10,
  },
  yellow: {
    backgroundColor: "yellow",
    padding: 10,
  },
  red: {
    backgroundColor: "#E44D2E",
    padding: 10,
  },
  categoryWrap: {
    marginTop: 70,
    marginLeft: 10,
  },
  infoWrap: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  mainHead: {
    fontFamily: "Manrope_400Regular",
    fontSize: 36,
    textTransform: "capitalize",
  },
  description: {
    fontFamily: "Manrope_300Light",
    fontSize: 24,
    marginTop: 10,
  },
  rowWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowWrap2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  col1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  col2: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
  },
  label: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    marginRight: 5,
  },
  valueText: {
    fontFamily: "Manrope_300Light",
    fontSize: 14,
    marginRight: 5,
  },
  tabWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  simpleTab: {
    fontFamily: "Manrope_400Regular",
    fontSize: 18,
  },
  activeTab: {
    fontFamily: "Manrope_400Regular",
    fontSize: 18,
    borderBottomWidth: 2,
  },
});
