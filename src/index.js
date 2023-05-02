import { React, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { CheckBox, Button, Input } from 'react-native';

export default function App() {

  let [inputText, setInputText] = useState("")
  let [tasks, setTasks] = useState([
    { description: "Laundry", 
      key: "1", 
      completed: false
    },
    { description: "Dishes", 
      key: "2", 
      completed: false
    },
    { description: "Make Bed", 
    key: "3", 
    completed: true
    },
  ])

  let addTask = useCallback(() => {
    
    let tasksKey = tasks.map(task=> parseInt(task.key))
      console.log(tasksKey)
    
    let maxKeys = Math.max(...tasksKey)+1
    let newTask = {description: inputText, completed: false, key: maxKeys.toString()}
      console.log(newTask)
    
    setTasks([...tasks, newTask])

    setInputText("")
  }, [inputText])
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.innerContainer}>

        <Text style={styles.title}>TODO List</Text>

        <FlatList data={tasks} keyExtractor={(item) => item.key} renderItem={({item: task}) =>
          <CheckBox onPress={() =>{
            let currentTask = tasks.find(t => t.key == task.key)
            currentTask.completed = !currentTask.completed
            setTasks([...tasks])
          }} title={task.description}
          key={task.key}
          checked={task.completed}
          textStyle={task.completed ? {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid'
          } : undefined}></CheckBox>
        } />

        <View style={[{height: 50, paddingBottom: 20, paddingTop: 20}, styles.input]}>

          <Input value={inputText} onChangeText={setInputText} style={{height: 50, paddingBottom: 15, paddingLeft: 15}}></Input>
          <Button style={styles.button} title="Add Item" onPress={addTask}></Button>

        </View>

      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  button: {
    height: 100,
  },
  input: {
    outline: "000",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
  },
  innerContainer: {
    maxWidth: 250,
    backgroundColor: "#f5f5f5"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});