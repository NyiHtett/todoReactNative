# todoReactNative

# storing data using SQlite
# toDoListReactNative

# 1. React & React Native Core Concepts

# 2. Performance & Optimization

# 3. Data Persistence & Storage

# 4. Debugging and memory management
- injected memory leak through adding task (leak added) button ( I used appState for the smooth purposes)
- when home button is clicked all the leak tasks are fired away
- in order to remove the leaks, we have to cancel the event listeners when we first create them. 

# 5. Optional Stretch – Modern Features

- React Native Bridge has to serialize and deserialize the data every communication. 
- So, just like in real life, traffic jam is inevitable and it becomes worse for big data transmissions, like photos, audios and videos. 
- Some weak results from React native bridge are janky animations, slow native module calls, gesture handling issues and memory pressure

- JSI solves the problem by excluding the bridge and actively calling the native functions. 

