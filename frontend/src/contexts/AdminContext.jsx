import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const toggleAdminMode = () => {
        setIsAdminMode((prev) => !prev);
    };

    return (
        <AdminContext.Provider value={{ isAdminMode, toggleAdminMode }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);