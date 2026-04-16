import { useState, useEffect } from "react";
import "./App.css";

// session type
type Session = {
  task: string;
  seconds: number;
};

function App() {
  // input value
  const [task, setTask] = useState("");

  // timer value
  const [seconds, setSeconds] = useState(0);

  // running or not
  const [running, setRunning] = useState(false);

  // store sessions
  const [list, setList] = useState<Session[]>([]);

  // timer logic
  useEffect(() => {
    let id: number;

    if (running) {
      id = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [running]);

  // start
  const start = () => {
    if (task === "") {
      alert("Enter task");
      return;
    }

    setSeconds(0);
    setRunning(true);
  };

  // stop
  const stop = () => {
    if (!running) return;

    const newItem = {
      task: task,
      seconds: seconds,
    };

    setList([...list, newItem]);

    setRunning(false);
    setSeconds(0);
    setTask("");
  };

  return (
    <div className="app">
      <h1>Focus App</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={running}
      />

      <h2>{seconds} sec</h2>

      <button onClick={start} disabled={running}>
        Start
      </button>

      <button onClick={stop} disabled={!running}>
        Stop
      </button>

      <h3>Sessions</h3>

      {list.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              {item.task} - {item.seconds} sec
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
