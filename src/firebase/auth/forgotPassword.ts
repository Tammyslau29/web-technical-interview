import firebase from "../config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase);

const forgotPassword = async (email: string) => {
    let result = null,
        error = null;
    try {
        result = await sendPasswordResetEmail(auth, email);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export default forgotPassword