import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.js";
import { getUser, insertUser, updateUserCity } from "../db/queries.js";
import { getUserIdentifiers } from "../utils/authentication.js";
import assert from "node:assert";
import { HTTPException } from "hono/http-exception";

const router = new Hono();

/**
 * ユーザー情報を取得する
 * @returns ユーザー情報と識別子
 */
router.get("/", requireAuth, async (c) => {
    const user = c.get("user");
    
    // ユーザー情報がコンテキストに設定されていない場合、401エラーをスローする
    assert(
        user,
        "User is not defined. Use authentication middleware to protect this route.",
    );
    
    let dbUser = getUser(user.userId);
    // ユーザーが初めてログインする場合（=> getUserがundefinedを返す）、
    // データベースにユーザーを登録する
    dbUser ??= await insertUser(user.userId);
    // Corbado Node.js SDKを使用してユーザーの識別子を取得する
    const userIdentifiers = await getUserIdentifiers(user.userId);
    return c.json({
        user: dbUser,
        identifiers: userIdentifiers.identifiers,
    });
});
router.post("/city", requireAuth, async (c) => {
    const user = c.get("user");
    assert(
        user,
        "User is not defined. Use authentication middleware to protect this route.",
    );

    const body = await c.req.json();
    const city = body.city;

    // 都市名が指定されていないか、文字列でない場合、400エラーをスローする
    if (!city || typeof city !== "string") {
        throw new HTTPException(400, {
            message: "City is required and must be a string",
        });
    }

    await updateUserCity(user.userId, city);
    const updatedUser = getUser(user.userId);
    if (!updatedUser) {
        return c.status(200);
    }
    return c.json(updatedUser);
});

export default router;
