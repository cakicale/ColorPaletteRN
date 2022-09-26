import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import PalettePreview from "../components/PalettePreview";

const Home = ({ navigation, route }) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newColorPalette = route.params?.newColorPalette;

  const fetchColorPalettes = useCallback(async () => {
    const results = await fetch(
      "https://color-palette-api.kadikraman.vercel.app/palettes"
    );

    if (results.ok) {
      const palettes = await results.json();
      setColorPalettes(palettes);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes([newColorPalette, ...colorPalettes]);
    }
  }, [newColorPalette]);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          colorPalette={item}
          handlePress={() => {
            navigation.navigate("ColorPalette", item);
          }}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ColorPaletteModal");
          }}
        >
          <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 10, backgroundColor: "white" },
  buttonText: {
    color: "teal",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Home;
