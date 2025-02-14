// userModel.ts
import db, { type User } from "./db.js";

/**
 * ユーザーをcorbadoUserIdで取得する
 * @param corbadoUserId - ユーザーの一意のcorbadoUserId
 * @returns ユーザーオブジェクトまたは見つからない場合はundefined
 */
export function getUser(corbadoUserId?: string): User | undefined {
    return db.data.users.find((user) => user.corbado_user_id === corbadoUserId);
}

/**
 * 新しいユーザーをデータベースに挿入する
 * @param corbadoUserId - ユーザーの一意のcorbadoUserId
 * @returns 新しく作成されたユーザーオブジェクト
 */
export async function insertUser(corbadoUserId: string) {
    // ユーザーが既に存在するか確認する
    if (getUser(corbadoUserId)) {
        throw new Error("User already exists");
    }
    const user: User = {
        id: crypto.randomUUID(),
        corbado_user_id: corbadoUserId,
        city: null,
    };
    await db.update(({ users }) => users.push(user));
    return user;
}

/**
 * ユーザーをcorbadoUserIdで更新する
 * @param corbadoUserId - ユーザーの一意のcorbadoUserId
 * @param city - 新しい都市名
 */
export async function updateUserCity(corbadoUserId: string, city: string) {
    await db.update(({ users }) => {
        const user = users.find(
            (user) => user.corbado_user_id === corbadoUserId,
        );
        if (user) {
            user.city = city;
        }
    });
}
