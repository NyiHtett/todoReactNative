import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Component, useReducer, useRef, useState } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';


/**
 * defining states' values based on action commands
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DONE_TASK":
      if (state == 5) {
        alert("Tasks maxed for the day");
      } else {
        return state + 1;
      }

    case "REWIND":
      if (state == 0) {
        alert("No tasks to rewind");
      } else {
        return state - 1;
      }
    default:
      return state;
  }
}




export default function App() {

  const taskref = useRef("");
  const [task, updateTask] = useState<string>("");

  /**
 * controlled components let the user to give the truth of each state 
 * uncontrolled components let the web browser to take a control on the states
 * 
 * ERROR LEARNT: Components should be named with starting letter in capital form
 * Cuz react would like to differentiable between a component instance and a HTML tag
 * @returns 
 */



  const [state, dispatch] = useReducer(reducer, 0);
  /**
   * useState example
   */
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* controlled component
      it has a single source of truth for each state
      can't put component in a component, if you want we have to take the component outside of component */}
      <TextInput

        value={task}
        // the current text value is tracked here
        onChangeText={(text: string) => updateTask(text)}
        placeholder='Enter a task'
      />

      {/* uncontrolled component */}
      <TextInput
        // no prop value = uncontrolled (React Native do the tracking)
        // taskref.current should not have .value like DOM 
        onChangeText={(text: string) => taskref.current = text}
        placeholder='Enter a task (unreliable)'
      />


      <Text> This is my todo app {`\n`}</Text>

      {/* useReducer can be used to update numerous states at the same time unlike useState */}
      <Text> Increasing using useReducer </Text>
      <Text> Number of tasks: {state}</Text>
      <Button
        title="Add Task"
        onPress={() => dispatch({ type: "ADD_DONE_TASK" })}
      />
      <Button
        title="Rewind"
        onPress={() => dispatch({ type: "REWIND" })}
      />


      <Text> Increasing using useState </Text>
      <Text> Number of tasks: {count}</Text>
      <Button
        title="Add Task"
        onPress={() => {
          if (count == 5) {
            alert("Tasks maxed for the day");
          } else {
            setCount(count + 1);
          }
        }}
      />
      <Button
        title="Rewind"
        onPress={() => setCount(count - 1)}
      />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
