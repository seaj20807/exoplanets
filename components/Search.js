import { View, StyleSheet, StatusBar } from "react-native";
import {
  Menu,
  IconButton,
  Checkbox,
  TextInput,
  Button,
  Text,
} from "react-native-paper";
import { useState } from "react";
import Data from "./Data";

export default function Search(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchOptions, setSearchOptions] = useState([
    [true, "Name", "pl_name", true],
    [true, "Host Name", "hostname", true],
    [true, "Discovery Year", "disc_year", true],
    [true, "Orbital Period (Earth Days)", "pl_orbper", true],
    [true, "Max. Orbital Distance (Au)", "pl_orbsmax", true],
    [true, "Radius (Earths)", "pl_rade", true],
    [true, "Mass (Earths)", "pl_masse", true],
    [true, "Distance From Earth (Parsecs)", "sy_dist", true],
  ]);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [isReady, setIsReady] = useState(true);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleChecked = (index) => {
    // Solution (make a copy of an array and replace the original with the copy) provided by ChatGPT
    const alteredOptions = [...searchOptions];
    alteredOptions[index][0] = !searchOptions[index][0];
    setSearchOptions(alteredOptions);
  };

  const sortData = (sortBy, ascending) => {
    const sortedData = [...data];
    ascending
      ? sortedData.sort((a, b) =>
          // Solution (a[sortby] instead of a.[sortBy]) provided by ChatGPT
          a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
        )
      : sortedData.sort((a, b) =>
          b[sortBy] > a[sortBy] ? 1 : a[sortBy] > b[sortBy] ? -1 : 0
        );
    setData(sortedData);
    alterSorting(sortBy);
  };

  const alterSorting = (sortBy) => {
    const alteredOptions = [...searchOptions];
    alteredOptions.forEach((option) => {
      if (option[2] === sortBy) {
        option[3] = !option[3];
      }
    });
    setSearchOptions(alteredOptions);
  };

  const getData = async (sortBy, ascending) => {
    const options = [];
    searchOptions.forEach((option) =>
      option[0] ? options.push(option[2]) : null
    );
    setIsReady(false);
    const { data, error } =
      text.length === 0
        ? await props.sb
            .from("planets")
            .select("pl_id," + options.toString())
            .order(sortBy, { ascending: ascending })
        : await props.sb
            .from("planets")
            .select("pl_id," + options.toString())
            .ilike("pl_name", "%" + text + "%")
            .order(sortBy, { ascending: ascending });
    if (error) {
      console.error(error);
    }
    setData(data);
    alterSorting(sortBy);
    setIsReady(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <Menu
          style={styles.menu}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="cog"
              iconColor="tomato"
              size={30}
              onPress={() => {
                openMenu();
              }}
            />
          }
        >
          <Checkbox.Item
            label="Name"
            status={searchOptions[0][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(0);
            }}
          />
          <Checkbox.Item
            label="Host Name"
            status={searchOptions[1][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(1);
            }}
          />
          <Checkbox.Item
            label="Discovery Year"
            status={searchOptions[2][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(2);
            }}
          />
          <Checkbox.Item
            label="Orbital Period (Earth days)"
            status={searchOptions[3][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(3);
            }}
          />
          <Checkbox.Item
            label="Max. Distance from Host (Au)"
            status={searchOptions[4][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(4);
            }}
          />
          <Checkbox.Item
            label="Radius (Earths)"
            status={searchOptions[5][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(5);
            }}
          />
          <Checkbox.Item
            label="Mass (Earths)"
            status={searchOptions[6][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(6);
            }}
          />
          <Checkbox.Item
            label="Distance from Earth (Parsecs)"
            status={searchOptions[7][0] ? "checked" : "unchecked"}
            onPress={() => {
              handleChecked(7);
            }}
          />
        </Menu>
        <TextInput
          style={styles.input}
          label="Search by name"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          onPress={() => {
            getData("pl_name", true);
          }}
        >
          Search
        </Button>
      </View>
      {!isReady ? (
        <View>
          <Text></Text>
          <Text>Loading...</Text>
        </View>
      ) : (
        <Data
          sort={sortData}
          options={searchOptions}
          data={data}
          sb={props.sb}
          user={props.user}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputcontainer: {
    flexDirection: "row",
    gap: 5,
  },
  menu: {
    marginTop: 25,
  },
  input: {
    height: 50,
    width: "50%",
  },
});
