import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import QuestionsPage from './components/QuestionsPage';
import GameBoard from './components/GameBoard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { admin, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return admin ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/questions"
                        element={
                            <PrivateRoute>
                                <QuestionsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/game"
                        element={
                            <PrivateRoute>
                                <GameBoard width={5} height={5} spacing={100} />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;