import { Pressable, SafeAreaView, Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { Link } from "expo-router";

const listTasks = [
  {
    title: "Do 100 push ups",
    description: "Keep pushing forward!",
    done: false,
  },
  {
    title: "Do 100 squats",
    description: "Keep pushing forward!",
    done: false,
  },
  {
    title: "Do 20 pull ups",
    description: "Keep pushing forward!",
    done: false,
  },
];

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0); // State to track points

  useEffect(() => {
    // Directly set tasks from the hardcoded variable
    const fetchTasks = () => {
      setTasks(listTasks);
      const initialPoints = listTasks.filter(task => task.done).length;
      setPoints(initialPoints);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const toggleTaskDone = async (taskId) => {
    // Check if the current task can be completed
    if (taskId > 0 && !tasks[taskId - 1].done) {
      alert("Complete the previous task before this one.");
      return;
    }

    try {
      const updatedTasks = tasks.map((task, index) => {
        if (index === taskId) {
          const newDoneState = !task.done;
          // Update points based on task's new state
          setPoints(prevPoints => prevPoints + (newDoneState ? 1 : -1));
          return { ...task, done: newDoneState };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task status', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter((_, index) => index !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.headTitle}>
        <Text style={styles.headSpecialTitle}>DIPA {" "}</Text>
        To Do List
      </Text>
      <Text>Your Points: {points}</Text> {/* Display points */}
      <ScrollView>
        <View>
          {loading ?
            <Text>Loading your tasks...</Text> : (
              <>
                <Text>Your To Do List ({tasks.length} task(s))</Text>
                {tasks.length !== 0 ?
                  (
                    <View>
                      {tasks.map((task, index) => (
                        <View key={index} style={styles.card}>
                          <View>
                            <Text style={[styles.taskTitle, task.done && { textDecorationLine: 'line-through' }]}>{task.title}</Text>
                            <Text style={styles.taskDescription}>{task.description}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                            <Pressable
                              style={{
                                backgroundColor: task.done ? 'green' : (index > 0 && !tasks[index - 1].done ? 'gray' : 'blue'), // Change color based on done state
                                padding: 8,
                                borderRadius: 5,
                              }}
                              onPress={() => {
                                if (task.done || index === 0 || (index > 0 && tasks[index - 1].done)) {
                                  toggleTaskDone(index);
                                }
                              }}
                            >
                              <Text style={{ color: 'white' }}>
                                {task.done ? 'Undone' : (index > 0 && !tasks[index - 1].done ? 'Locked' : 'Done')}
                              </Text>
                            </Pressable>
                            <Link push href={{ pathname: '/update', params: { id: index } }}>
                              <Pressable style={{ backgroundColor: 'black', padding: 8, borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Edit</Text>
                              </Pressable>
                            </Link>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text>There is no task. Create one!</Text>
                  )}
              </>
            )}
        </View>
        <View>
          <Text>Michael Mervin Ruswan</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
