import { CorbadoAuth } from "@corbado/react";
import { use, useEffect } from "react";
import { UserContext } from "../context/user.tsx";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const userCtx = use(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const externalUserInfo = userCtx.externalUserInfo;
        switch (externalUserInfo.status) {
            case "success":
                if (externalUserInfo.user.city === null) {
                    navigate("/signup/onboarding");
                } else {
                    navigate("/profile");
                }
                return;
            case "error":
                // handle this case more gracefully in a real application
                console.error(externalUserInfo.message);
                return;
        }
    }, [navigate, userCtx.externalUserInfo]);

    return (
        <div>
            <h1>Login</h1>
            <CorbadoAuth
                onLoggedIn={() => {
                    // ここでは何もしません。ユーザーが既にオンボーディングを完了しているかを確認するために、バックエンドの応答を待つ必要があります。
                    // バックエンドの呼び出しはユーザーストアで行われています。
                }}
                initialBlock="login-init"
            />
        </div>
    );
}
