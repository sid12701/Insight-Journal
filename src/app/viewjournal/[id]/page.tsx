"use client"
import { useEffect, useState } from 'react';
import Journal from '../../../utilities/models/journalSchema';
import { findPost } from "@/utilities/actions"
import dayjs from 'dayjs';

interface Journal {
    _id?: string;
    title?: string;
    journal?: string;
    date?: string;
    insight?: string;
    author?: {
        buffer?: any;
    };
    __v?: number;
}

const JournalPage = ({ params }: any) => {
    const [journal, setJournal] = useState<Journal>({});

    useEffect(() => {
        if (params && params.id) {
            const fetchJournal = async () => {
                try {
                    const journalData = await findPost(params.id);
                    setJournal(journalData);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchJournal();
        }
    }, [params]);

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-semibold text-center mb-4">{dayjs(journal.date).format('MMM D, YYYY')}</h1>
            <h2 className="text-xl font-semibold mb-2">{journal.title}</h2>
            <p className="text-base text-gray-700 mb-3">{journal.journal}</p>
            <p className="text-gray-600">{journal.insight}</p>
        </div>
    )
}

export default JournalPage;

