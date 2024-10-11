import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  Input,
  Icon,
  IconElement,
  Layout,
  Spinner,
  Button,
  Modal,
} from "@ui-kitten/components";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USERINFO } from "../../store/actions/user-actions";
import { persistedStore } from "../../store/store";
import Logo from "../../assets/jselectric.png";
import { apiPath } from "../../utils/routes";
const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" style={{ borderColor: "#fff" }} />
  </View>
);
const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [registerFlag, setRegisterFlag] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState(
    "Username and Password required"
  );
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    // persistedStore.pause();
    // persistedStore.flush().then(() => {
    //   return persistedStore.purge();
    // });
  }, []);
  const errorModal = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };
  const handleLogin = async () => {
    if (username == "" || password == "") {
      errorModal();
    }
    if (username !== "" && password !== "") {
      const dataObj = {
        username,
        password,
      };
      setLoadingFlag(true);
      axios
        .post(`${apiPath.prodPath}/api/users/login`, dataObj)
        .then((res) => {
          if (res.data.error) {
            setErrorText("Wrong Username or Password.");
            errorModal();
            setLoadingFlag(false);
          } else {
            dispatch(USERINFO(res.data.userInfo));
            navigation.navigate("Home");
            setLoadingFlag(false);
          }
        })
        .catch((err) => {
          setLoadingFlag(false);
          console.log(err);
        });
    }
  };
  const handleRegisterForm = async () => {
    console.log("called register");
  };
  const resetValues = () => {
    setPassword("");
    setUsername("");
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
    return (
      <View style={styles.loginWrap}>
        <Layout style={styles.container} level="1">
          <Image style={styles.logo} source={Logo} alt="logo" />
          <Input
            placeholder="Username"
            value={username}
            onChangeText={(username) => setUsername(username)}
            style={styles.inpCus}
            size="large"
            textStyle={{ fontFamily: "Manrope_400Regular" }}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            size="large"
            style={styles.inpCus}
            onChangeText={(password) => setPassword(password)}
            textStyle={{ fontFamily: "Manrope_400Regular" }}
          />
          {loadingFlag ? (
            <Button
              style={styles.button}
              appearance="outline"
              accessoryLeft={LoadingIndicator}
            >
              {(evaProps) => (
                <Text
                  {...evaProps}
                  style={{
                    fontFamily: "Manrope_400Regular",
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  LOADING
                </Text>
              )}
            </Button>
          ) : (
            <Button
              style={styles.button}
              size="large"
              onPress={() => handleLogin()}
            >
              {(evaProps) => (
                <Text
                  {...evaProps}
                  style={{
                    fontFamily: "Manrope_400Regular",
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Login
                </Text>
              )}
            </Button>
          )}
          <Modal style={styles.modalCus} visible={visible}>
            <Text
              style={{
                fontFamily: "Manrope_400Regular",
                marginBottom: 20,
                textAlign: "center",
                fontSize: 18,
                color: "red",
              }}
            >
              {errorText}
            </Text>
          </Modal>
        </Layout>
      </View>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 192,
    height: 141,
  },
  container: {
    width: Dimensions.get("window").width / 1.2,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    borderRadius: 20,
    backgroundColor: "#191C27",
  },
  inpCus: {
    width: Dimensions.get("window").width / 1.3,
  },
  button: {
    margin: 2,
    borderColor: "#D9531E",
    borderWidth: 2,
    backgroundColor: "#D9531E",
    fontFamily: "Manrope_400Regular",
    fontSize: 20,
  },
  modalCus: {
    width: Dimensions.get("window").width / 1.1,
    paddingTop: 70,
    paddingBottom: 70,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#efefef",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
  },
});
