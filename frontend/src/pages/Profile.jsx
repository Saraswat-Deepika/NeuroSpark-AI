import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const COLORS = {
    primary: "#0456AC",
    primaryLight: "#0A7AE8",
    white: "#FCFEFC",
    dark: "#0A0E1A",
    gray: "#94A3B8",
    danger: "#EF4444",
};

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/auth/me');
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user profile", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) return;

        try {
            await API.delete('/auth/me');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error("Failed to delete account", err);
            alert("An error occurred while deleting your account.");
        }
    };

    if (loading) {
        return <div style={{ color: COLORS.white, padding: "40px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>Loading Profile...</div>;
    }

    if (!user) {
        return <div style={{ color: COLORS.white, padding: "40px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>Failed to load profile.</div>;
    }

    return (
        <div style={{
            padding: "40px",
            color: COLORS.white,
            width: "100%",
            boxSizing: "border-box",
            maxWidth: "1400px",
            margin: "0 auto",
            fontFamily: "'Inter', sans-serif"
        }}>
            <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "30px",
                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}>Your Profile</h1>

            <div style={{
                background: "rgba(255,255,255,0.03)",
                padding: "40px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.primaryLight}20)`,
                        border: `2px solid ${COLORS.primary}80`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem",
                        boxShadow: `0 10px 30px rgba(4, 86, 172, 0.3)`,
                        overflow: "hidden"
                    }}>
                        {user.picture ? <img src={user.picture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
                    </div>
                    <div>
                        <h2 style={{ margin: "0 0 10px 0", fontSize: "2rem", color: COLORS.white }}>{user.name || "Student User"}</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: COLORS.gray, marginBottom: "15px" }}>
                            <span>✉️ {user.email}</span>
                        </div>
                    </div>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", width: "100%" }} />

                <div>
                    <h3 style={{ margin: "0 0 20px 0", fontSize: "1.3rem", color: COLORS.danger }}>Danger Zone</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(239, 68, 68, 0.05)", padding: "20px", borderRadius: "12px", border: `1px solid ${COLORS.danger}30`, flexWrap: "wrap", gap: "15px" }}>
                        <div>
                            <h4 style={{ margin: "0 0 5px 0", color: COLORS.white }}>Delete Account</h4>
                            <p style={{ margin: 0, color: COLORS.gray, fontSize: "0.9rem" }}>Permanently remove your account and all data</p>
                        </div>
                        <button style={{
                            padding: "10px 20px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: COLORS.danger,
                            border: `1px solid ${COLORS.danger}50`,
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                            transition: "all 0.2s ease"
                        }}
                            onMouseEnter={(e) => { e.target.style.background = COLORS.danger; e.target.style.color = COLORS.white; }}
                            onMouseLeave={(e) => { e.target.style.background = "rgba(239, 68, 68, 0.1)"; e.target.style.color = COLORS.danger; }}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
