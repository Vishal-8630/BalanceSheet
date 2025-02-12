import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const sotredToken = localStorage.getItem("token");

        if(storedUser && sotredToken) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    }

    const updateUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);