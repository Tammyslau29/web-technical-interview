import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../firebase/config"
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { id, ...updatedData } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'Missing document ID' });
            }
            const documentRef = doc(db, "homes", id);
            await updateDoc(documentRef, updatedData);

            res.status(200).json({ message: 'Document updated successfully' });
        } catch (error) {
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Unable to update document' });
        }
    } else {
        res.status(405).end();
    }
}
