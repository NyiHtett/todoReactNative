import { StatusBar } from 'expo-status-bar';
import { FlatList, FlatListComponent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Component, useReducer, useRef, useState, useEffect } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import axio from 'axios';
import List from './List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Dimensions } from 'react-native';
import SQL from './SQL';
import { AppState } from 'react-native';
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
  const [listShow, setListShow] = useState(false)
  const taskref = useRef("");
  const [task, updateTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [data, updateData] = useState<{ joke: string }>({ joke: "" });
  const [name, setName] = useState("");
  const [sql, setSQL] = useState([{ name: '', age: 0 }]);
  const [sqlRequested, setSqlRequested] = useState(false);
  //const db = useSQLiteContext();
  /**
   * useEffect example
   * whenever the user add one more task, we will generate the new joke
   */
  useEffect(() => {
    //dalert("there is a new joke");
    axio.get('https://icanhazdadjoke.com/', {
      headers: { Accept: "application/json" }
    })
      .then(res => {
        updateData(res.data);
      })
      .catch();
  }, [tasks])

  /**
   * useEffect for fetching userSetting from asyncStorage
   */
  useEffect(() => {
    const saveNameAndRetrieve = async () => {
      await AsyncStorage.setItem("userName", "nyi");
      const newName = await AsyncStorage.getItem("userName");
      setName(newName)
    }
    saveNameAndRetrieve();
  }, [])

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
  // saveName();
  // const name = AsyncStorage.getItem("name");
  return (
    <SQLiteProvider
      databaseName='userDatabse.db'
      onInit={async (db) => {
        await db.execAsync
          (`
        DROP TABLE IF EXISTS USERS; 
        CREATE TABLE IF NOT EXISTS USERS (
        NAME TEXT UNIQUE NOT NULL,
        AGE INTEGER NOT NULL);

        INSERT OR IGNORE INTO USERS(NAME, AGE) VALUES('Nyi', 23);
        INSERT OR IGNORE INTO USERS(NAME, AGE) VALUES('Hipower', 22);
      `)
      }
      }
      options={{ useNewConnection: false }} // we don't want to create multiple connections and use the old one instead
    >


      <View style={styles.container}>
        <Text> {name} </Text>
        {/* controlled component
      it has a single source of truth for each state
      can't put component in a component, if you want we have to take the component outside of component */}
        <TextInput
          value={task}
          // the current text value is tracked here
          onChangeText={(text: string) => updateTask(text)}
          placeholder='Enter a task'
        />
        <Button
          title="submit task to AsyncStorage"
          onPress={() => {

            if (task.trim()) {
              setTasks([...tasks, ...Array.from({ length: 100 }, () => task)])
              updateTask("") // cleaning the task
            }
          }}
        />

        {/* uncontrolled component */}
        <TextInput
          // no prop value = uncontrolled (React Native do the tracking)
          // taskref.current should not have .value like DOM 
          onChangeText={(text: string) => taskref.current = text}
          placeholder='Enter a task (unreliable)'
        />
        <Button
          title="submit task to SQlite"
          onPress={() => {
            if (task.trim()) {
              setTasks([...tasks, ...Array.from({ length: 100 }, () => task)])
              updateTask("") // cleaning the task
            }
          }}
        />


        <Text> This is my todo app {`\n`}</Text>

        {/* useReducer can be used to update numerous states at the same time unlike useState */}
        <Text> Increasing using useReducer </Text>
        <Text> Number of tasks: {state}</Text>
        <Button
          title="Add Task (Leak added) "
          onPress={() => {
            console.log("button for lingering is clicked")
            const sub = AppState.addEventListener(`change`, () => {
              console.log("lingers baby")
            })

            sub.remove();
            dispatch({ type: "ADD_DONE_TASK" })
          }
          }
        />


        <Button
          title="Rewind"
          onPress={() => dispatch({ type: "REWIND" })}
        />

        {/* <SafeAreaView>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <Text key={index}>{item}</Text>
          )}
        />
      </SafeAreaView> */}


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
        <Text> Joke of the day: {data.joke}</Text>
        <Button
          title={listShow ? "Hide the tasks" : "Show the tasks"}
          onPress={() => { setListShow(!listShow) }}
        />

      /**
        lesson learnt:
        react.memo doesn't take responsibility for unmounting and mounting, but for rerendering
        */
        {/* <List tasks={tasks} style={{ display: listShow ? 'flex' : 'none' }} /> */}

        {listShow ? <List tasks={tasks} /> : <Text>"tasks are hidden"</Text>}

        <SQL sql={sql} setSQL={setSQL} setSqlRequested={setSqlRequested} sqlRequested={sqlRequested} />
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
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
