import { useEffect, useState } from "react";
import "./App.css";

// Type for each completed focus session
type Session = {
  task: string;
  duration: number;
};

function App() {
  // State for task input
  const [task, setTask] = useState<string>("");

  // State for timer in seconds
  const [seconds, setSeconds] = useState<number>(0);

  // State to check if timer is running
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // State to store completed sessions
  const [sessions, setSessions] = useState<Session[]>([]);

  // useEffect runs timer when session starts
  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  // Start a new focus session
  const startSession = () => {
    if (task.trim() === "") {
      alert("Please enter a task name.");
      return;
    }

    setSeconds(0);
    setIsRunning(true);
  };

  // Stop the current session and save it
  const stopSession = () => {
    if (!isRunning) return;

    const newSession: Session = {
      task: task,
      duration: seconds,
    };

    setSessions((prevSessions) => [...prevSessions, newSession]);
    setIsRunning(false);
    setSeconds(0);
    setTask("");
  };

  return (
    <div className="app-container">
      <h1>Focus Tracker App</h1>
      <p className="subtitle">Track your focus sessions throughout the day</p>

      <div className="card">
        <label htmlFor="task">Task Name</label>
        <input
          id="task"
          type="text"
          placeholder="Enter your task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={isRunning}
        />

        <div className="timer-box">
          <h2>{seconds} seconds</h2>
        </div>

        <div className="button-group">
          <button onClick={startSession} disabled={isRunning}>
            Start
          </button>
          <button onClick={stopSession} disabled={!isRunning}>
            Stop
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Completed Focus Sessions</h2>

        {sessions.length === 0 ? (
          <p>No completed sessions yet.</p>
        ) : (
          <ul className="session-list">
            {sessions.map((session, index) => (
              <li key={index}>
                <strong>{session.task}</strong> - {session.duration} seconds
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;