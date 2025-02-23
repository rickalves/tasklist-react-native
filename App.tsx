import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import './global.css' //Importa o Tailwind css

// Definindo o tipo de uma tarefa
interface Task {
  id: string;
  value: string;
  completed: boolean;
}

export default function TodoApp(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Carrega as tarefas salvas
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem('taskList');
      if (savedTasks) setTaskList(JSON.parse(savedTasks));
    };
    loadTasks();
  }, []);

  // Salva as tarefas sempre que a lista mudar
  useEffect(() => {
    AsyncStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  // Adiciona uma nova tarefa
  const addTask = (): void => {
    if (task.trim() !== '') {
      const newTask: Task = {
        id: Date.now().toString(),
        value: task,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setTask('');
    }
  };

  // Exclui uma tarefa pelo ID
  const deleteTask = (id: string): void => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  // Alterna o status de conclusão da tarefa
  const toggleComplete = (id: string): void => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Renderiza cada tarefa
  const renderTask = ({ item }: { item: Task }): JSX.Element => (
    <View
      className={`flex-row  justify-between items-center py-4 px-8 rounded-lg mb-2 ${
        item.completed ? 'bg-green-300' : 'bg-gray-100'
      }`}
    >
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Text
          className={`text-lg ${
            item.completed ? 'line-through text-gray-600' : 'text-black'
          }`}
        >
          {item.value}
        </Text>
      </TouchableOpacity>

      {/* Botão de Exclusão */}
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Icon name="trash" size={20} color="red"/>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-center mb-5 mt-8">📝 Lista de Tarefas</Text>

      {/* Campo de texto */}
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Digite uma tarefa"
        value={task}
        onChangeText={setTask}
      />

      {/* Botão de adicionar tarefa */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-3 mb-4"
        onPress={addTask}
      >
        <Text className="text-white text-center font-semibold">Adicionar Tarefa</Text>
      </TouchableOpacity>

      {/* Lista de tarefas */}
      <FlatList
        data={taskList}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}