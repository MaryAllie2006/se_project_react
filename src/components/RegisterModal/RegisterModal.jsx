import React, { useState } from 'react';

export default function RegisterModal({ isOpen, onClose, onRegister }) {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await onRegister({ name, avatar, email, password });
            setName("");
            setAvatar("");
            setEmail("");
            setPassword("");
            onClose();
        } catch (err) {
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
            <form className="modal__form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <label>Avatar URL</label>
                <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} required />
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <div className="modal__error">{error}</div>}
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
} 