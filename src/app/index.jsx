import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoItem } from "../../components/TodoItem";
import { useTodos } from "../../hooks/useTodos";

export default function Index() {
  const [text, setText] = useState("");
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const router = useRouter();

  const handleAdd = () => {
    const added = addTodo(text);
    if (added) {
      setText("");
    }
  };

  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text here"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
