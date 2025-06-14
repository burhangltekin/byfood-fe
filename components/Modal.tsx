import React from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string; // add optional className
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, className }) => {
    if (!open) return null;
    return (
        <div
            className={className}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
        >
            <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 300 }}>
                <button style={{ float: 'right' }} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;