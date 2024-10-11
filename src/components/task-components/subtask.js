import React, { useState, useEffect } from "react";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import moment from "moment";
import axios from "axios";
import { apiPath } from "../../../utils/routes";
import { StatusBar } from "expo-status-bar";
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
function SubTask({ subTasks }) {
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
      <View style={styles.mainCon}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.btnText}>Add Sub Task</Text>
        </TouchableOpacity>
        {subTasks.length ? (
          <View>
            <Text>Sub Tasks will come here</Text>
          </View>
        ) : (
          <View>
            <Text>No Sub Tasks are present</Text>
          </View>
        )}
      </View>
    );
  }
}

export default SubTask;
const styles = StyleSheet.create({
  mainCon: {
    display: "flex",
    flexDirection: "column",
  },
  addBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Manrope_300Light",
  },
});
