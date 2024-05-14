import { View, StyleSheet, StatusBar } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import FavData from "./FavData";
import ErrAlert from "./ErrDialog";

export default function Profile(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async (email) => {
    const { data, error } = await props.sb
      .from("user_favorites")
      .select("*")
      .like("user_email", "%" + email + "%");
    if (error) {
      setErrorMessage(error.toString());
    }
    setFavorites(data);
  };

  const signUp = async () => {
    const { data, error } = await props.sb.auth.signUp({
      email: userName,
      password: password,
    });
    if (error) {
      setErrorMessage(error.toString());
    } else if (data) {
      await login();
    }
  };

  const login = async () => {
    const { data, error } = await props.sb.auth.signInWithPassword({
      email: userName,
      password: password,
    });
    if (error) {
      setErrorMessage(error.toString());
    } else if (data) {
      await props.setUser(data);
      await getFavorites(data.user.email);
      setLoginStatus(true);
    }
  };

  const logout = async () => {
    const { error } = await props.sb.auth.signOut();
    if (error) {
      setErrorMessage(error.toString());
    }
    setLoginStatus(false);
    setFavorites([]);
    await props.setUser([]);
  };

  return loginStatus ? (
    <View style={styles.container}>
      <Text>Welcome {props.user.user.email}!</Text>
      <Button
        mode="contained"
        onPress={() => {
          logout();
        }}
      >
        Log Out
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          getFavorites(props.user.user.email);
        }}
      >
        Refresh
      </Button>
      <Text>List of favorites:</Text>
      {favorites.length == 0 ? (
        <Text>
          You have no favorites saved yet, or you might have to Refresh them.
        </Text>
      ) : (
        <FavData
          getFavorites={getFavorites}
          data={favorites}
          sb={props.sb}
          user={props.user}
        />
      )}
    </View>
  ) : (
    <View style={styles.container}>
      {errorMessage.length > 0 && (
        <ErrAlert
          show={true}
          message={errorMessage}
          setMessage={setErrorMessage}
        />
      )}
      <TextInput
        label="User Name (E-mail)"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        style={{ width: "80%" }}
      />
      <TextInput
        label="Password"
        secureTextEntry={secureText}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={{ width: "80%" }}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setSecureText(!secureText)}
          />
        }
      />
      <Button
        mode="contained"
        onPress={() => {
          signUp();
        }}
      >
        Sign Up
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          login();
        }}
      >
        Log In
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
