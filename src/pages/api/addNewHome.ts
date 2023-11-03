import { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const docRef = await addDoc(collection(db, 'homes'), data);

            res.status(201).json(req.body);
        } catch (error) {
            console.error('Error adding document: ', error);
            res.status(500).json({ error: 'Unable to add document' });
        }
    } else {
        res.status(405).end();
    }
}
