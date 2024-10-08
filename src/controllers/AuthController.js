import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, database } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";

// Função para registrar um novo usuário
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
};

// Função para fazer login de um usuário
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
};

// Função para login com o google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Usuário autenticado com Google:", user);
        return user;
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
    }
};

export const saveUserData = async (uid, nome, email) => {
    try {
        await set(ref(database, `usuarios/${uid}`), {
            nome: nome,
            email: email
        });
    } catch (error) {
        console.error("Erro ao salvar dados:", error);
    }
};