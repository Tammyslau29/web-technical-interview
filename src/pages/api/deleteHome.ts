import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const id = req.body;
            if (!id) {
                return res.status(400).json({ error: 'Missing document ID' });
            }
            const documentRef = doc(db, "homes", id);
            await deleteDoc(documentRef);

            res.status(200).json({ message: 'Document deleted successfully' });
        } catch (error) {
            console.error('Error deleting document:', error);
            res.status(500).json({ error: 'Unable to delete document' });
        }
    } else {
        res.status(405).end();
    }
}
