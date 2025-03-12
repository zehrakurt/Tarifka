import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import axios from "axios";
import { Linking } from "react-native";

export default function MealDetail({ route }) {
  const { mealId } = route.params; 
  const [mealDetail, setMealDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMealDetail = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        setMealDetail(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        Alert.alert("Error", "Failed to fetch meal details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetail();
  }, [mealId]);

  const handleYoutubeLink = () => {
    if (mealDetail?.strYoutube) {
      Linking.openURL(mealDetail.strYoutube).catch((err) =>
        Alert.alert("Error", "Failed to open YouTube link.")
      );
    } else {
      Alert.alert("Error", "YouTube link not available for this meal.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: mealDetail.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{mealDetail.strMeal}</Text>
      <Text style={styles.category}>Category: {mealDetail.strCategory}</Text>
      <Text style={styles.instructions}>{mealDetail.strInstructions}</Text>
      <TouchableOpacity style={styles.youtubeButton} onPress={handleYoutubeLink}>
        <Text style={styles.youtubeButtonText}>Watch on YouTube</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    padding: 10,
    backgroundColor: "#FFF",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
    lineHeight: 20,
  },
  youtubeButton: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20, 
  },
  youtubeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
