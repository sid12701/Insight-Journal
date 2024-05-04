"use client";
import React, { useEffect } from "react";
import AiJournal from "@/components/AiJournal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Send, NotebookPen } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const JournalPage = () => {
  const [date, setDate] = React.useState<Date>();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [insight, setInsights] = React.useState("");
  const [ai, setAi] = React.useState<boolean>(false);
  const router = useRouter();
  const [journal, setJournal] = React.useState({
    title: "",
    journal: "",
    insight: "",
    date: new Date(),
  });

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd"));
    } else {
      setInputValue("");
    }
  }, [date]);

  const handleJournal = async () => {
    const updatedJournal = { ...journal, insight };
    const response = await axios.post("/api/journal", updatedJournal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="min-h-screen bg- py-8 flex flex-col items-center justify-center ">
      <div className="max-w-4xl w-full p-6 rounded-lg shadow-lg bg-[#F1E8D5]">
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left flex justify-between items-center"
              >
                <span>{date ? format(date, "PPP") : "Pick a date"}</span>
                <CalendarIcon className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={journal.title}
              onChange={(e) =>
                setJournal({ ...journal, title: e.target.value })
              }
              className="mt-1 w-full border-black border-solid rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="journal"
              className="block text-sm font-medium text-gray-700"
            >
              Journal
            </label>
            <textarea
              name="journal"
              placeholder="Journal"
              value={journal.journal}
              onChange={(e) =>
                setJournal({ ...journal, journal: e.target.value })
              }
              className="mt-1 w-full border-black border-solid rounded-md shadow-sm p-2 h-40"
            />
          </div>

          <div>
            <label
              htmlFor="insight"
              className="block text-sm font-medium text-gray-700"
            >
              Insights
            </label>
            {/* <textarea
              name="insight"
              placeholder="Insight"
              value={insight}
              onChange={e => setJournal({ ...journal, insight: e.target.value })}
              className="mt-1 w-full border-gray-700 rounded-md shadow-sm p-2 h-40"
            /> */}
            <textarea
              name="insight"
              placeholder="Insight"
              value={insight}
              onChange={(e) => setInsights(e.target.value)}
              className="mt-1 w-full border-gray-700 rounded-md shadow-sm p-2 h-40"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div
              className="text-center text-base font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 cursor-pointer rounded-lg transition ease-in-out duration-200 px-5 py-2"
              onClick={() => setAi(true)}
            >
              Use AI to generate Insights
            </div>

            <Button
              type="submit"
              onClick={handleJournal}
              className="text-center inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 hover:scale-110 transition-transform duration-200 ease-in-out"
            >
              <NotebookPen />
              Journal it
            </Button>
          </div>
        </form>

        {/* <div
          className="mt-4 text-base text-indigo-700 cursor-pointer hover:underline hover: transition transform duration-200 ease-in-out"
          onClick={() => setAi(true)}
        >
          Use AI to generate Insights
        </div> */}

        {ai && (
          <AiJournal
            onInsightAdd={setInsights}
            setAi={setAi}
            journalText={journal.journal}
          />
        )}
      </div>
    </div>
  );
};

export default JournalPage;
