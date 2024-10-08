import { useState, useEffect } from "react";
import { Text, Pressable, View, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Update() {
    const [createError, setCreateError] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskId, setTaskId] = useState(null);
    const router = useRouter();
    const params = useLocalSearchParams();

    useEffect(() => {
        const loadTask = async () => {
            try {
                const taskId = params.id;
                console.log("Task ID from params:", taskId);
                setTaskId(taskId);

                const tasksData = await AsyncStorage.getItem('tasks');
                console.log("All tasks data:", tasksData);

                if (tasksData) {
                    const tasks = JSON.parse(tasksData);
                    const task = tasks.find(t => t.id === taskId);

                    if (task) {
                        console.log("Found task:", task);
                        setTitle(task.title);
                        setDescription(task.description);
                    } else {
                        console.log("No task found with ID:", taskId);
                    }
                } else {
                    console.log("No tasks data found in AsyncStorage");
                }
            } catch (error) {
                console.error("Failed to load task", error);
            }
        };

        loadTask();
    }, []);

    const updateTask = async () => {
        if (!title) {
            setCreateError(true);
            return;
        }

        try {
            const tasksData = await AsyncStorage.getItem('tasks');
            let tasks = tasksData ? JSON.parse(tasksData) : [];

            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], title, description };
            } else {
                console.log("Task not found, cannot update");
                return;
            }

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            Alert.alert("Success", "Task updated successfully");
            router.replace('/');
        } catch (error) {
            console.error("Failed to update task", error);
            Alert.alert("Error", "Failed to update task");
        }
    };

    return (
        <View>
            <View>
                <View>
                    {createError ?
                        <View>
                            <View>
                                <Text>{"\u00A0"}Something error. Please check your input. Make sure you fill the title input</Text>
                            </View>
                        </View>
                        : null}
                    <Text style={{
                        fontSize: 20,
                    }}>
                        Title<Text style={{
                            color: 'red',
                        }}>*</Text>
                    </Text>
                    <TextInput
                        placeholder="Enter your task title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        maxLength={100}
                    />
                    <Text style={{
                        fontSize: 20,
                    }}>
                        Description
                    </Text>
                    <TextInput
                        placeholder="Enter your task description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            padding: 10,
                            borderRadius: 5,
                        }}
                    />
                    <View>
                        <Pressable
                            onPress={updateTask}
                            style={{
                                backgroundColor: '#3b82f6',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 10,
                            }}
                        >
                            <Text>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}