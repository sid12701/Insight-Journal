import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // If you want to use images like icons
import { Button } from "./ui/button";

interface JournalCardProps {
  title: string;
  journal: string;
  insight: string;
  date: string;
  id: string;
}

const JournalCard = ({
  title,
  journal,
  insight,
  date,
  id,
}: JournalCardProps) => {
  const router = useRouter();

  return (
    // <Card className="bg-gray-800 text-white rounded-full p-6 w-64 h-64 flex items-center justify-center shadow-lg hover:shadow-xl transition duration-300">
    //   <CardContent className="text-center">
    //     <CardTitle className="text-lg font-bold mb-1">{title}</CardTitle>
    //     <p className="text-gray-400 text-xs">{journal}</p>
    //     {insight && <p className="text-gray-400 text-xs">{insight}</p>}
    //     <p className="text-gray-500 text-xs mt-2">{date}</p>
    //     <Link
    //       href={`/viewjournal/${id}`}
    //       className="text-blue-500 hover:text-blue-600 transition duration-300 text-xs mt-2 inline-block"
    //     >
    //       Read more
    //     </Link>
    //   </CardContent>
    // </Card>


    <div className="flex justify-center my-5">
    <div className="bg-white border border-gray-300 rounded-lg shadow hover:shadow-md overflow-hidden w-full max-w-md mx-auto">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <span className="text-sm italic text-gray-600">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">{journal}</span>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">{insight}</p>
        <div className="flex justify-between items-center">
          <Link href={`/viewjournal/${id}`}
            className="text-blue-600 hover:text-blue-700 transition duration-300 text-sm">
            Read more &rarr;
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default JournalCard;
