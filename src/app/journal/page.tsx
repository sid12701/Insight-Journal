"use client";
import AiJournal from "@/components/AiJournal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import React, { ChangeEventHandler, useEffect } from "react";
import axios from "axios";

const JournalPage = () => {
  const [date, setDate] = React.useState<Date>();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [insight, setInsights] = React.useState("");
  const [ai, setAi] = React.useState<boolean>(false);
  const [journal, setJournal] = React.useState({
    title: "",
    journal: "",
    insight: "",
    date: new Date(),
  });

  useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd"));
    } else {
      setInputValue("");
    }
  }, [date]);

  const handleHiddenInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const newDate = parse(newValue, "yyyy-MM-dd", new Date());
    if (isValid(newDate)) {
      setDate(newDate);
      setJournal({ ...journal, date: newDate });
    }
  };

  // const handleJournal = async () => {
  //   console.log(journal);
  //   const response = await axios.post("/api/journal", journal);
  //   console.log(response.data);
  // };

  const handleJournal = async () => {
    const updatedJournal = { ...journal, insight };
    console.log(updatedJournal);
    const response = await axios.post("/api/journal", updatedJournal);
    console.log(response.data);
  };
  
  // const insightOnchange = (e) => {
  //   const newInsight = e.target.value;
  //   setInsights(newInsight);
  //   // // setJournal(prevJournal => ({
  //   // //   ...prevJournal,
  //   // //   insight: newInsight,
  //   // // }));
  // };
  return (
    <div>
      <>
        <div>
          <div className="flex flex-col">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"} 
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                value={inputValue}
                onChange={handleHiddenInputChange}
                placeholder={format(new Date(), "y-MM-dd")}
                type="hidden"
                name="date"
              />
            </div>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={journal.title ? journal.title : ""}
              onChange={(e) =>
                setJournal({ ...journal, title: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <label htmlFor="journal">Journal</label>
            <textarea
              name="journal"
              placeholder="Journal"
              value={journal.journal ? journal.journal : ""}
              onChange={(e) =>
                setJournal({ ...journal, journal: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <label htmlFor="insight">Insights</label>
            <textarea
              name="insight"
              placeholder="Insight"
              value={insight ? insight : ""}
              onChange={(e) =>
                setJournal({ ...journal, insight: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <input
              value={insight}
              type="hidden"
              onChange={(e) =>
                setJournal({ ...journal, insight: e.target.value })
              }
            ></input>
            <Button className="gap-2" type="submit" onClick={handleJournal}>
              <Send />
              Journal it
            </Button>
          </div>
        </div>
        <span
          className="cursor-pointer text-cyan-600 gap-5"
          onClick={() => setAi(true)}
        >
          Or you can use AI to help summarise your day in an insightful way
        </span>
        {ai ? <AiJournal onInsightAdd={setInsights} setAi={setAi} /> : null}
      </>
    </div>
  );
};

export default JournalPage;




