import { View, StyleSheet, StatusBar } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Welcome to ExoPlanets!</Text>
      <Text></Text>
      <Text>
        With this app you can access some of the data maintained in the NASA
        Exoplanet Archive (https://exoplanetarchive.ipac.caltech.edu/). Due to
        the sheer amount of data available in the archive, only some details of
        each planet are availble in this app. They are (if available):
      </Text>
      <View style={styles.details}>
        <Text></Text>
        <Text>- Name of the planet.</Text>
        <Text>- Name of the star the planet is orbiting.</Text>
        <Text>- Year of discovery.</Text>
        <Text>- Orbital period (or length of a year, in Earth days).</Text>
        <Text>
          - Maximum orbital distance (in AU, historically the average Earth-Sun
          distance).
        </Text>
        <Text>- Radius of the planet (compared to Earth radius).</Text>
        <Text>- Mass of the planet (compared to Earth mass).</Text>
        <Text>
          - Distance from Earth (in parsecs, roughly 3.26 light-years).
        </Text>
      </View>
      <Text></Text>
      <Text>
        An empty search will provide all the available data. The details shown
        can be further limited by clicking on the cog next to the search field
        in the Search tab. You can also limit the search by the planets name.
        Clicking on a planet shows all the available details of the specific
        planet. By signing up and loggin in in the Profile tab, you can also
        save specific planets to your favorites.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  details: {
    alignItems: "flex-start",
    marginLeft: 25,
    marginRight: 25,
  },
});
