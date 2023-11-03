import { db } from "../config";
import { collection, addDoc } from 'firebase/firestore'
import { Home } from "../../types/Home"

const addHome = async (home: Home) => {
    let result = null,
        error = null;
    try {
        result = await await addDoc(collection(db, 'Homes'), {
            ...home
        })
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export default addHome