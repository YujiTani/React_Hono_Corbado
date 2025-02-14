import { Config, SDK } from "@corbado/node-sdk";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";

// Retrieve environment variables
const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;
if (!projectID) {
    throw Error("Project ID is not set");
}
if (!apiSecret) {
    throw Error("API secret is not set");
}
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;
if (!frontendAPI) {
    throw Error("Frontend API URL is not set");
}
if (!backendAPI) {
    throw Error("Backend API URL is not set");
}
// Corbado Node.js SDKの設定を初期化する
const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

export async function getAuthenticatedUserFromCookie(c: Context) {
    const sessionToken = getCookie(c, "cbo_session_token");

    if (!sessionToken) {
        return null;
    }

    try {
        // 既存のトークン検証ロジック
        return await sdk.sessions().validateToken(sessionToken);
    } catch (error) {
        // 必要に応じてエラーをログに記録
        return null;
    }
}

export async function getAuthenticatedUserFromAuthorizationHeader(c: Context) {
    const sessionToken = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!sessionToken) {
        return null;
    }
    try {
        return await sdk.sessions().validateToken(sessionToken);
    } catch {
        return null;
    }
}


// 指定されたユーザーIDに関連付けられた全ての識別子を取得する
export function getUserIdentifiers(userId: string) {
    // 作成日の降順でユーザー識別子を一覧表示する
    return sdk.identifiers().listByUserId(userId);
}
