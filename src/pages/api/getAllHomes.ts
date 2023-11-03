import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../firebase/config"

import { collection, query, DocumentData, getDocs } from "firebase/firestore";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const items: DocumentData[] = []
            const q = query(collection(db, "homes"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            res.status(200).json(items);
        } catch (error) {
            console.error('Error fetching data from Firebase:', error);
            res.status(500).json({ error: 'Unable to fetch data' });
        }
    } else {
        res.status(405).end();
    }
}
