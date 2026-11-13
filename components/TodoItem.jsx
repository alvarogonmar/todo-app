import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const TodoItem = React.memo(
  ({ item, onToggle, onRemove, onDetails, theme }) => {
    return (
      <View style={[styles.itemRow, { borderBottomColor: theme.border }]}>
        <Text
          style={[
            styles.todoItem,
            { color: theme.text },
            item.completed && styles.completedText,
          ]}
          onPress={() => onToggle(item.id)}
          onLongPress={() => onDetails(item.id)}
        >
          {item.title}
        </Text>
        <Pressable onPress={() => onRemove(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color={theme.icon} />
        </Pressable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
  },
  todoItem: {
    color: "white",
    flex: 1,
    fontSize: 18,
  },
  completedText: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  icon: {
    color: "red",
  },
});
