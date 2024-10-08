import { useState } from "react";
import { Text, Pressable, View, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function Create() {
    const [createError, setCreateError] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createTask = async () => {
        if (title.trim() === '') {
            setCreateError(true);
            return;
        }

        try {
            const newTask = {
                title,
                description,
                id: Date.now().toString(),
            };

            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];

            tasks.push(newTask);
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

            Alert.alert('Success', 'Task created successfully');
            setTitle('');
            setDescription('');
            setCreateError(false);
            router.replace('/');
        } catch (error) {
            Alert.alert('Error', 'Failed to create task');
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
                            onPress={createTask}
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