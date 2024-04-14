"use client"
import { useEffect, useState } from 'react';
import Journal from '../../../utilities/models/journalSchema';
import {findPost} from "@/utilities/actions"
import { format } from 'date-fns';
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

const JournalPage = ({params} : any) => {
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
    return(
        <div>
            <h1>Journal Page</h1>
            <h2>{journal.title}</h2>
            <p>{journal.journal}</p>
            <p>{dayjs(journal.date).format('MMM D, YYYY')}</p>
            <p>{journal.insight}</p>
        </div>
    )
}


export default JournalPage;