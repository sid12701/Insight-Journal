import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import Link from "next/link";


const JournalCard = ({title, journal,insight,date,id})=>{
    const router = useRouter();
    return (
        <Card className="bg-black text-white">
            <CardTitle>{title}</CardTitle>
            <CardContent>
                <p>{journal}</p>
                <p>{insight}</p>
                <p>{date}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/viewjournal/${id}`}>Read more</Link>
            </CardFooter>

        </Card>
    )
}


export default JournalCard;