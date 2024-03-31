"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { journalSubmit } from "../../utilities/actions"
import AiJournal from "@/components/AiJournal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");
  const [journal, setJournal] = useState<string>("");
  const [ai, setAi] = useState<boolean>(false);
  const [insight,setInsights] = useState("")

  const Ai = (childInsights)=>{
    setInsights(childInsights)
  }

  useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd")); 
    } else {
      setInputValue("");
    }
  }, [date]);

  const handleHiddenInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value
    const newDate = parse(newValue, "yyyy-MM-dd", new Date());
    if (isValid(newDate)) {
      setDate(newDate);
    }
  };

  const handleSubmit = async (e) => {
    const date = e.get("date");
    const title = e.get("title");
    const journal = e.get("journal");
    const insight = e.get("insight");
    await journalSubmit({ date, title, journal, insight })
  };

  return (
    <>
    <form action={handleSubmit}>
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
          className="border border-gray-300 rounded-md p-2 mt-2"
        />
        <label htmlFor="journal">Journal</label>
        <textarea
          name="journal"
          placeholder="Journal"
          className="border border-gray-300 rounded-md p-2 mt-2"
        />
        <label htmlFor="insight">Journal</label>
        <textarea
          name="insight"
          placeholder="Insight"
          className="border border-gray-300 rounded-md p-2 mt-2"
        />
        <Button className="gap-2" type="submit">
          <Send />
          Journal it
        </Button>
      </div>
    </form>
    <span
          className="cursor-pointer text-cyan-600 gap-5"
          onClick={() => setAi(true)}
        >
          Or you can use AI to help summarise your day in an insightful way
        </span>
    {ai ? (
      <AiJournal onInsightAdd={setInsights} setAi={setAi}/>
        ) : null}

        <div>
          {insight}
        </div>
    </>
  );
};

export default Page;

// {
//   ai && (
//     <div
//       className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
//       id="my-modal"
//     >
//       <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//         <div className="mt-3 text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//             {/* Icon or Image */}
//           </div>
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             AI Insights
//           </h3>
//           <div className="mt-2 px-7 py-3">
//             <p className="text-sm text-gray-500">
//               Your AI-generated insights or summary will appear here.
//             </p>
//           </div>
//           <div className="items-center px-4 py-3">
//             <Button className="mx-auto" onClick={() => setAi(false)}>
//               Close
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }