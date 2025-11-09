interface ConnectionStatusProps {
    status: 'disconnected' | 'waiting' | 'connected';
    partnerId: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, partnerId }) => (
    <div className="connection-info" >
        <div className="connection-status" >
            Status:
            <span className={`status ${status}`}>
                {status.toUpperCase()}
            </span>
        </div>
        {partnerId && <div>Partner ID: {partnerId} </div>}
    </div>
);

export default ConnectionStatus;