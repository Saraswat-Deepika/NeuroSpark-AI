import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const COLORS = {
        primary: "#0456AC",
        primaryLight: "#0A7AE8",
        white: "#FCFEFC",
        dark: "#0A0E1A",
        darker: "#050811",
        accent: "#00D4FF",
        gray: "#94A3B8"
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            background: COLORS.darker,
            color: COLORS.white,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            overflowX: "hidden",
            boxSizing: "border-box"
        }}>
            {/* Background */}
            <div style={{
                position: "fixed",
                inset: 0,
                background: `
                    radial-gradient(ellipse at 50% 50%, ${COLORS.primary}12 0%, transparent 60%),
                    radial-gradient(ellipse at 20% 80%, ${COLORS.accent}08 0%, transparent 40%)
                `,
                zIndex: 0
            }} />

            {/* Grid Pattern */}
            <div style={{
                position: "fixed",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(4, 86, 172, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(4, 86, 172, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
                zIndex: 0
            }} />

            {/* Navigation */}
            <nav style={{
                position: "relative",
                zIndex: 100,
                padding: "20px 40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer"
                }}>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                        boxShadow: `0 4px 20px rgba(4, 86, 172, 0.4)`
                    }}>
                        🧠
                    </div>
                    <span style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: COLORS.white
                    }}>
                        NeuroSpark
                    </span>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "10px 20px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: COLORS.white,
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.05)";
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "10px 20px",
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                            border: "none",
                            color: COLORS.white,
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: `0 4px 15px rgba(4, 86, 172, 0.4)`,
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section - Compact */}
            <section style={{
                width: "100%",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "60px 20px 100px",
                textAlign: "center",
                position: "relative",
                zIndex: 10
            }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    background: "rgba(4, 86, 172, 0.15)",
                    border: `1px solid ${COLORS.primary}40`,
                    borderRadius: "50px",
                    marginBottom: "24px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.8s ease 0.2s"
                }}>
                    <span style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: COLORS.accent,
                        animation: "pulse 2s infinite"
                    }} />
                    <span style={{
                        fontSize: "0.85rem",
                        color: COLORS.white,
                        fontWeight: "500"
                    }}>
                        AI-Powered Learning Platform
                    </span>
                </div>

                {/* Main Headline - Smaller */}
                <h1 style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: "800",
                    lineHeight: "1.1",
                    margin: "0 0 20px 0",
                    letterSpacing: "-0.02em",
                    maxWidth: "900px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.4s"
                }}>
                    <span style={{ color: COLORS.white }}>Master Anything with </span>
                    <span style={{
                        background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.primaryLight} 50%, ${COLORS.primary} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        position: "relative"
                    }}>
                        Intelligent Diagnostics
                        <svg style={{
                            position: "absolute",
                            bottom: "-4px",
                            left: "0",
                            width: "100%",
                            height: "8px"
                        }} viewBox="0 0 300 8" preserveAspectRatio="none">
                            <path
                                d="M0,6 Q75,0 150,6 T300,6"
                                fill="none"
                                stroke={COLORS.primary}
                                strokeWidth="2"
                                opacity="0.6"
                            />
                        </svg>
                    </span>
                    <br />
                    <span style={{ color: COLORS.white }}></span>
                </h1>

                {/* Subheadline - Compact */}
                <p style={{
                    fontSize: "1.1rem",
                    color: COLORS.gray,
                    lineHeight: "1.6",
                    maxWidth: "600px",
                    margin: "0 0 32px 0",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.6s"
                }}>
                    Experience the future of education. Our AI analyzes your knowledge,
                    identifies gaps, and creates personalized learning paths.
                </p>

                {/* CTA Buttons - Smaller */}
                <div style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginBottom: "40px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 0.8s"
                }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "14px 28px",
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                            border: "none",
                            color: COLORS.white,
                            borderRadius: "10px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: `0 8px 25px rgba(4, 86, 172, 0.4)`,
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = `0 12px 35px rgba(4, 86, 172, 0.6)`;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = `0 8px 25px rgba(4, 86, 172, 0.4)`;
                        }}
                    >
                        <span>Start Learning Free</span>
                        <span>→</span>
                    </button>

                    <button
                        style={{
                            padding: "14px 28px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: COLORS.white,
                            borderRadius: "10px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.08)";
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.03)";
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        <span style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem"
                        }}>▶</span>
                        Watch Demo
                    </button>
                </div>

                {/* Social Proof - Compact */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1s ease 1s"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ display: "flex" }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                                    border: `2px solid ${COLORS.darker}`,
                                    marginLeft: i === 1 ? 0 : "-10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.9rem"
                                }}>
                                    {["👨‍🎓", "👩‍💻", "🧑‍🔬", "👩‍🏫", "🎓"][i - 1]}
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{
                                fontWeight: "600",
                                color: COLORS.white,
                                fontSize: "0.95rem"
                            }}>
                                50,000+ Students
                            </div>
                            <div style={{
                                fontSize: "0.8rem",
                                color: COLORS.gray
                            }}>
                                joined this month
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                        <div style={{ display: "flex", gap: "2px" }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i} style={{ color: "#FBBF24", fontSize: "0.85rem" }}>★</span>
                            ))}
                        </div>
                        <span style={{ color: COLORS.gray, fontSize: "0.8rem" }}>
                            <strong style={{ color: COLORS.white }}>4.9</strong> / 5
                        </span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                width: "100%",
                padding: "60px 20px",
                position: "relative",
                zIndex: 10
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px"
                }}>
                    {[
                        { icon: "🎯", title: "AI Diagnostics", desc: "Smart analysis of knowledge gaps" },
                        { icon: "📈", title: "Track Progress", desc: "Visual analytics of your growth" },
                        { icon: "🧠", title: "Adaptive Learning", desc: "Personalized paths that evolve" },
                        { icon: "⚡", title: "Instant Feedback", desc: "Real-time insights and guidance" }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                backdropFilter: "blur(20px)",
                                borderRadius: "16px",
                                padding: "28px 24px",
                                border: "1px solid rgba(255,255,255,0.08)",
                                textAlign: "center",
                                transition: "all 0.3s ease",
                                cursor: "default"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.borderColor = COLORS.primary;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            }}
                        >
                            <div style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "14px",
                                background: `linear-gradient(135deg, ${COLORS.primary}30 0%, ${COLORS.primaryLight}20 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.8rem",
                                margin: "0 auto 16px",
                                border: `1px solid ${COLORS.primary}40`
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                margin: "0 0 8px 0",
                                color: COLORS.white
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: COLORS.gray,
                                fontSize: "0.9rem",
                                lineHeight: "1.5",
                                margin: 0
                            }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.3); }
                }
            `}</style>
        </div>
    );
}

export default HomePage;