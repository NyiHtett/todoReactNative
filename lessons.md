useReducer becomes useful when there are mulitple relationships between the states


Debugging and memory management

- injected memory leak through adding task (leak added) button ( I used appState for the smooth purposes)
- when home button is clicked all the leak tasks are fired away
- in order to remove the leaks, we have to cancel the event listeners when we first create them. 
