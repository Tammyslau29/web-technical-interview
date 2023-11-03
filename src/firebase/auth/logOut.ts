import firebase from "../config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase);

const logOut = async () => {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export default logOut