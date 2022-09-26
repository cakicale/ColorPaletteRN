import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Switch,
  Button,
  Alert,
} from "react-native";
import { COLORS } from "../mock/colors";

const ColorPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);

  const handleValueChange = useCallback((value, color) => {
    if (value) {
      setSelectedColors((colors) => [...colors, color]);
    } else {
      setSelectedColors((colors) =>
        colors.filter(
          (selectedColor) => selectedColor.colorName !== color.colorName
        )
      );
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      Alert.alert("Please enter palette name");
    } else if (selectedColors.length < 3) {
      Alert.alert("Enter more than 2 colors");
    } else {
      const newColorPalette = {
        paletteName,
        colors: selectedColors,
      };
      navigation.navigate("Home", { newColorPalette });
    }
  }, [paletteName, selectedColors]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name of the palette</Text>
      <TextInput
        style={styles.input}
        value={paletteName}
        onChangeText={setPaletteName}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.colorContainer}>
            <Text>{item.colorName}</Text>
            <Switch
              onValueChange={(selected) => handleValueChange(selected, item)}
              value={
                !!selectedColors.find(
                  (color) => color.colorName === item.colorName
                )
              }
            />
          </View>
        )}
      />
      <Button
        onPress={handleSubmit}
        color="teal"
        style={styles.button}
        title="Submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 5, backgroundColor: "white", flex: 1 },
  name: { paddingLeft: 10, paddingTop: 10 },
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    borderRadius: 5,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  button: {
    height: 40,
    backgroundColor: "teal",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default ColorPaletteModal;
