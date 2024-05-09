"use client";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import AiJournal from "@/components/AiJournal";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

export default function Component() {
  const [date, setDate] = useState<Date>();
  const [insight, setInsights] = useState("");
  const [ai, setAi] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [journal, setJournal] = useState({
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

  useEffect(() => {
    setButtonDisabled(
      !journal.title || !journal.journal || !insight || !date
    );
  }, [journal, insight, date]);

  const handleJournal = async () => {
    try {
      setLoading(true);
      const updatedJournal = { ...journal, insight, date };
      const response = await axios.post("/api/journal", updatedJournal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Successfully journalled");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to journal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Journal Entry</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Record your thoughts and reflections.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 items-center gap-4">
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          placeholder="Title"
          type="text"
          value={journal.title}
          onChange={(e) => setJournal({ ...journal, title: e.target.value })}
        />
        <label
          htmlFor="journal"
          className="block text-sm font-medium text-gray-700"
        >
          Journal
        </label>
        <Textarea
          className="min-h-[200px]"
          id="journal"
          placeholder="Write your journal entry..."
          value={journal.journal}
          onChange={(e) => setJournal({ ...journal, journal: e.target.value })}
        />
        <label
          htmlFor="insight"
          className="block text-sm font-medium text-gray-700"
        >
          Insights
        </label>
        <Textarea
          className="min-h-[100px]"
          id="insights"
          placeholder="Record your insights..."
          value={insight}
          onChange={(e) => setInsights(e.target.value)}
        />
        <div className="flex justify-between">
          <Button
            type="submit"
            onClick={handleJournal}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Journaling..." : "Journal it"}
          </Button>
          <Button variant="outline" onClick={() => setAi(true)}>
            Generate AI insights
          </Button>
        </div>
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
}
