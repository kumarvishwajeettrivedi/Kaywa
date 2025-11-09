interface QueueButtonProps {
    onJoinQueue: () => void;
}

const QueueButton: React.FC<QueueButtonProps> = ({ onJoinQueue }) => (
    <button onClick={onJoinQueue}>Join Matching Queue</button>
);

export default QueueButton;