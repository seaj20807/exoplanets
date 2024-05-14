import { useState } from "react";
import { Portal, Modal, Text, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function InfoModal(props) {
  const [infoVisible, setInfoVisible] = useState(props.show);

  const hideInfoModal = () => {
    setInfoVisible(false);
    props.setItem([]);
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        style={styles.info}
        visible={infoVisible}
        onDismiss={hideInfoModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Planet name: {props.item.pl_name}</Text>
        <Text>Star to orbit: {props.item.hostname}</Text>
        <Text>Discovery year: {props.item.disc_year}</Text>
        <Text>Orbital period (Earth days): {props.item.pl_orbper}</Text>
        <Text>Maximum orbital distance (Au): {props.item.pl_orbsmax}</Text>
        <Text>Radius (Earths): {props.item.pl_rade}</Text>
        <Text>Mass (Earths): {props.item.pl_masse}</Text>
        <Text>Distance from Earth (Parsecs): {props.item.sy_dist}</Text>
        {props.user.length != 0 && props.profile == false && (
          <View style={{ alignItems: "center" }}>
            <Button
              style={{ marginTop: 15, width: "70%" }}
              mode="contained"
              onPress={() => props.saveFavorite(props.item)}
            >
              Save To Favorites
            </Button>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <Button
            style={{ marginTop: 15, width: "25%" }}
            mode="contained"
            onPress={() => hideInfoModal()}
          >
            Ok
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  info: {
    marginLeft: 20,
    marginRight: 20,
  },
});
