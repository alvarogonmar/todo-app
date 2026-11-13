import { ThemeContext } from "@/context/themeContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
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
  const { todos, addTodo, toggleTodo, removeTodo, loaded } = useTodos();
  const router = useRouter();

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);

  const handleAdd = () => {
    const added = addTodo(text);
    if (added) {
      setText("");
    }
  };

  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "white" }}>Cargando tareas...</Text>
      </SafeAreaView>
    );
  }

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
        <Pressable
          style={styles.button}
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          <Text style={styles.buttonText}>Theme</Text>
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
            theme={theme}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      color: theme.text,
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
}
