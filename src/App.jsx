import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import TaskList from "./components/TaskList";

function App() {
  const [tasks] = useState([
    {id: 1, title: "Learn React components", completed: false},
    {id: 2, title: "Understand props and state", completed: true},
  ])

  return (
    <main>
      <h1>Task Management Application</h1>
      <WelcomeMessage name="Reader" />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;