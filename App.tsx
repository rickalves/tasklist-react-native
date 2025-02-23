import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global.css'

// Definindo a interface para cada tarefa
interface Task {
  id: string;
  value: string;
  completed: boolean;
}

export default function TodoApp(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Carregar as tarefas salvas ao abrir o app
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('taskList');
        if (savedTasks) {
          setTaskList(JSON.parse(savedTasks) as Task[]);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    loadTasks();
  }, []);

  // Salvar as tarefas sempre que a lista mudar
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    };
    saveTasks();
  }, [taskList]);

  // Adiciona uma nova tarefa
  const addTask = (): void => {
    if (task) {
      const newTask: Task = {
        id: Date.now().toString(),
        value: task,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setTask('');
    }
  };

  // Exclui uma tarefa por ID
  const deleteTask = (id: string): void => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  // Alternar status de conclusão da tarefa
  const toggleComplete = (id: string): void => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Renderiza cada tarefa
  const renderTask = ({ item }: { item: Task }): JSX.Element => (
    <TouchableOpacity
      // Observação: a propriedade "className" não é padrão no React Native,
      // mas se estiver usando alguma lib (por exemplo, Tailwind CSS para RN),
      // pode mantê-la.
      className={`p-4 rounded-lg mb-2 ${
        item.completed ? 'bg-green-300' : 'bg-gray-100'
      }`}
      onPress={() => toggleComplete(item.id)}
      onLongPress={() => deleteTask(item.id)}
    >
      <Text
        className={`text-lg ${
          item.completed ? 'line-through text-gray-600' : 'text-black'
        }`}
      >
        {item.value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-center mb-4 mt-12">
        📝 Lista de Tarefas
      </Text>

      {/* Campo de texto para adicionar tarefa */}
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
        <Text className="text-white text-center font-semibold">
          Adicionar Tarefa
        </Text>
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
