import { CorbadoProvider } from "@corbado/react";
import englishTranslations from "./utils/corbado-translations.ts";
import UserProvider from "./context/user.tsx";
import Layout from "./layouts/layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";
import UserAreaPage from "./pages/UserAreaPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import OnboardingPage from "./pages/OnboardingPage.tsx";

const queryClient = new QueryClient();

export default function App() {
    return (
        <CorbadoProvider
            projectId={import.meta.env.VITE_CORBADO_PROJECT_ID}
            // Corbado UI のダークモードを有効にする
            darkMode="on"
            // Corbado UI にカスタムスタイルを適用する
            theme="cbo-custom-styles"
            // カスタム翻訳を利用する
            customTranslations={{ en: englishTranslations }}
        >
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <RoutesDefinition />
                </UserProvider>
            </QueryClientProvider>
        </CorbadoProvider>
    );
}

function RoutesDefinition() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/userarea" element={<UserAreaPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/signup/onboarding"
                        element={<OnboardingPage />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
