import React, { useState } from 'react';

const COLORS = {
    primary: "#0456AC",
    primaryLight: "#0A7AE8",
    white: "#FCFEFC",
    dark: "#0A0E1A",
    gray: "#94A3B8",
    success: "#10B981",
    danger: "#EF4444",
};

function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div style={{
            padding: "40px",
            color: COLORS.white,
            width: "100%",
            boxSizing: "border-box",
            maxWidth: "1400px",
            margin: "0 auto"
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "30px",
                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}>Settings</h1>

            <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                padding: "40px",
                textAlign: "center",
                color: COLORS.gray
            }}>
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⚙️</div>
                <h3 style={{ margin: "0 0 10px 0", color: COLORS.white, fontSize: "1.5rem" }}>Settings</h3>
                <p style={{ margin: 0, fontSize: "1rem" }}>Configurable options and account management features are coming soon.</p>
            </div>
        </div>
    );
}

export default Settings;
