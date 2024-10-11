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
function Notes({ notes }) {
  return (
    <View>
      <Text>This is Notes comp</Text>
    </View>
  );
}

export default Notes;
