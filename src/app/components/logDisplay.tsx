interface LogDisplayProps {
  logs: string[];
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => (
  <div className="logs">
    <h3>Logs:</h3>
    {logs.map((log, index) => (
      <div key={index} className="log-entry">{log}</div>
    ))}
  </div>
);

export default LogDisplay;