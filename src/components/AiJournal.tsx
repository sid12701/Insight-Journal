import logo from "../../public/meditate-logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { aiJournal } from "../utilities/actions";
import React from "react";


interface AiJournalProps {
  setAi: React.Dispatch<React.SetStateAction<boolean>>;
}

const AiJournal: React.FC<AiJournalProps> = ({ setAi , onInsightAdd}) => {
  const [aiJournalCompletion, setAiJournalCompletion] = React.useState<
    string | null
  >(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dayJournal = formData.get("dayjournal");
    const completion = await aiJournal(dayJournal);
    // await aiJournal(dayJournal);  
    setAiJournalCompletion(completion)
  };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-[#E0E0E0] w-full max-w-4xl">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Image src={logo} alt="meditate" className="rounded-full" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            AI Insights
          </h3>
          <div className="mt-2 px-7 py-3">
            {aiJournalCompletion ? (
              <>
              <p>{aiJournalCompletion}</p>
              <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3">
                  <Button className="mx-auto mb-2 sm:mb-0" onClick={() => onInsightAdd(aiJournalCompletion)}>
                    Add to insights
                  </Button>
                  <Button className="mx-auto" onClick={() => setAi(false)}>
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <label htmlFor="dayjournal">Describe your day here</label>
                <textarea
                  name="dayjournal"
                  placeholder="Describe your day here"
                  className="border border-gray-300 rounded-md p-2 mt-2 w-full resize-none"
                ></textarea>
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3">
                  <Button className="mx-auto mb-2 sm:mb-0" type="submit">
                    Generate Insightful Journal
                  </Button>
                  <Button className="mx-auto" onClick={() => setAi(false)}>
                    Close
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiJournal;
