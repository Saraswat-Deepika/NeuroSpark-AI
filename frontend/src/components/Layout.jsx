import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Do not render the header on the login page itself
    if (location.pathname === "/") {
        return <Outlet />;
    }

    return (
        <div>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 40px",
                    backgroundColor: "#1e1e1e",
                    borderBottom: "1px solid #333",
                    color: "white"
                }}
            >
                <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
                    NeuroSpark AI
                </h2>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </header>

            {/* Rest of the page content */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
