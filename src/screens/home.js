import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import TaskComponent from "../components/task-comp";
const Home = ({ navigation, route }) => {
  const user = useSelector((state) => state.userReducer.user);
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  } else {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="light" backgroundColor="black" />
        <View style={styles.homeWrap}>
          <Text style={styles.MainHeading}>
            Welcome{" "}
            {user !== "" || user !== undefined || user !== null
              ? user.fullname
              : ""}
          </Text>
          <View style={styles.tasksCon}>
            <Text style={styles.taskHeading}>Tasks:</Text>
            <TaskComponent
              navigation={navigation}
              user={
                user !== "" && user !== undefined && user !== null ? user : ""
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default Home;
const widthDM = Dimensions.get("window").width;
const styles = StyleSheet.create({
  homeWrap: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  MainHeading: {
    color: "#fff",
    fontSize: 32,
    alignSelf: "center",
    marginTop: 55,
    fontFamily: "Manrope_300Light",
    textAlign: "center",
  },
  taskCon: {
    width: widthDM / 1.1,
    display: "flex",
    flexDirection: "column",
  },
  taskHeading: {
    color: "#fff",
    fontSize: 28,
    paddingTop: 30,
    fontFamily: "Manrope_600SemiBold",
    borderBottomWidth: 1,
    borderColor: "#fff",
    alignSelf: "flex-start",
  },
});
