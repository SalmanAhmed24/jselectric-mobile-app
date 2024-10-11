import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
import React, { useState, useEffect } from "react";
import BackBtn from "../../assets/back-button.png";
import { StatusBar } from "expo-status-bar";

const AddTask = ({ navigation }) => {
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

        <View style={styles.addTaskMainWrap}>
          <View style={styles.backWrap}>
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                source={BackBtn}
                alt="Back"
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.newTaskText}>Add New Task</Text>
        </View>
      </ScrollView>
    );
  }
};

export default AddTask;

const styles = StyleSheet.create({
  addTaskMainWrap: {
    flex: 1,
    backgroundColor: "#15b2d3",
    padding: 20,
    paddingTop: 40,
  },
  backWrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  newTaskText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 54,
    fontFamily: "Manrope_400Regular",
    color: "#000",
  },
});
