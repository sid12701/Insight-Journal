// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import JournalCard from "@/components/JournalCard";
// // import { formatDate } from "@/utilities/formatDate";
// // import { truncateTo100Words } from "@/utilities/truncateTo100";
// // import Cookies from "js-cookie";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import { Button } from "@/components/ui/button";
// // import { format } from "date-fns";
// // import { CalendarIcon } from "lucide-react";
// // import { Calendar } from "@/components/ui/calendar";

// // interface Post {
// //   _id: string;
// //   title: string;
// //   journal: string;
// //   date: string;
// //   insight?: string;
// //   author: string;
// // }

// // const Page = () => {
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [date, setDate] = useState<Date | undefined>(undefined);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const pageSize = 3;
// //   const totalPosts = posts.length;
// //   const totalPages = Math.ceil(totalPosts / pageSize);

// //   const indexOfLastPost = currentPage * pageSize;
// //   const indexOfFirstPost = indexOfLastPost - pageSize;
// //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// //   const fetchJournals = async () => {
// //     try {
// //       const token = Cookies.get("token");
// //       if (!token) {
// //         return;
// //       }
// //       const response = await axios.get("/api/viewJournals", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const formattedPosts = response.data.data.map((post: Post) => ({
// //         ...post,
// //         journal: truncateTo100Words(post.journal),
// //         insight: post.insight ? truncateTo100Words(post.insight) : undefined,
// //       }));
// //       setPosts(formattedPosts);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // const fetchJournalsByDate = async (date: Date) => {
// //   //   try {
// //   //     const token = Cookies.get("token");
// //   //     if (!token) {
// //   //       return;
// //   //     }
// //   //     const formattedDate = format(date, "dd-MM-yyyy");
// //   //     const response = await axios.get(`/api/viewJournals?date=${formattedDate}`, {
// //   //       headers: {
// //   //         Authorization: `Bearer ${token}`,
// //   //       },
// //   //     });
// //   //     // const formattedPosts = response.data.data.map((post: Post) => ({
// //   //     //   ...post,
// //   //     //   journal: truncateTo100Words(post.journal),
// //   //     //   insight: post.insight ? truncateTo100Words(post.insight) : undefined,
// //   //     // }));
// //   //     // setPosts(formattedPosts);
// //   //   } catch (err) {
// //   //     console.log(err);
// //   //   }
// //   // };
// //   const fetchJournalsByDate = async (date: Date) => {
// //     try {
// //       const token = Cookies.get("token");
// //       if (!token) {
// //         return;
// //       }
// //       const formattedDate = format(date, "dd-MM-yyyy");
// //       const response = await axios.get(`/api/viewJournals?date=${formattedDate}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const formattedPosts = response.data.data.map((post: Post) => ({
// //         ...post,
// //         journal: truncateTo100Words(post.journal),
// //         insight: post.insight ? truncateTo100Words(post.insight) : undefined,
// //       }));
// //       setPosts(formattedPosts);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
  
// //   const handleSearchByDate = () => {
// //     if (date) {
// //       fetchJournalsByDate(date);
// //     } else {
// //       fetchJournals();
// //     }
// //   };
  
// //   // const handleSearchByDate = () => {
// //   //   if (date) {
// //   //     fetchJournalsByDate(date);
// //   //   }
// //   // };

// //   // useEffect(() => {
// //   //   fetchJournals();
// //   // }, []);

// //   return (
// //     <div className="flex flex-col h-screen">
// //       <div className="items-center px-4 flex-row flex">
// //         <div className="w-3/4 ml-[50px]">
// //           <Popover>
// //             <PopoverTrigger asChild>
// //               <Button
// //                 variant="outline"
// //                 className="w-full text-left flex justify-between items-center"
// //               >
// //                 <span>{date ? format(date, "dd-mm-yyyy") : "Pick a date"}</span>
// //                 <CalendarIcon className="ml-2" />
// //               </Button>
// //             </PopoverTrigger>
// //             <PopoverContent className="w-auto p-0">
// //               <Calendar mode="single" selected={date} onSelect={setDate} />
// //             </PopoverContent>
// //           </Popover>
// //         </div>
// //         <Button className="mx-2" onClick={handleSearchByDate}>
// //           Search
// //         </Button>
// //       </div>

// //       <div className="p-10 flex-grow flex flex-wrap justify-center gap-6">
// //         {currentPosts.map((post) => (
// //           <JournalCard
// //             key={post._id}
// //             title={post.title}
// //             journal={post.journal}
// //             date={formatDate(post.date)}
// //             insight={post.insight as string}
// //             id={post._id}
// //           />
// //         ))}

// //         <div className="fixed bottom-0 left-0 right-0 p-4 w-full flex justify-between items-center bg-gray-100">
// //           <button
// //             disabled={currentPage === 1}
// //             onClick={() => paginate(currentPage - 1)}
// //           >
// //             Prev
// //           </button>
// //           <button
// //             disabled={currentPage === totalPages}
// //             onClick={() => paginate(currentPage + 1)}
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import JournalCard from "@/components/JournalCard";
// import { formatDate } from "@/utilities/formatDate";
// import { truncateTo100Words } from "../../utilities/truncateTo100";
// import Cookies from "js-cookie";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";

// interface Post {
//   _id: string;
//   title: string;
//   journal: string;
//   date: string;
//   insight?: string;
//   author: string;
// }

// const Page = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 3;
//   const totalPosts = posts.length;
//   const totalPages = Math.ceil(totalPosts / pageSize);

//   const token = Cookies.get("token");

//   const indexOfLastPost = currentPage * pageSize;
//   const indexOfFirstPost = indexOfLastPost - pageSize;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   // const getUserId = async () => {
//   //   const response = await axios.get("/api/viewJournals");
//   //   const formattedPosts = response.data.data.map((post: Post) => ({
//   //     ...post,
//   //     journal: truncateTo100Words(post.journal),
//   //     insight: post.insight ? truncateTo100Words(post.insight) : undefined,
//   //   }));
//   //   setPosts(formattedPosts);
//   // };

//   // useEffect(() => {
//   //   getUserId();
//   // }, []);

//   const fetchJournals = async () => {
//     try {
//       const token = Cookies.get("token");
//       if (!token) {
//         return;
//       }
//       const response = await axios.get("/api/viewJournals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const formattedPosts = response.data.data.map((post: Post) => ({
//         ...post,
//         journal: truncateTo100Words(post.journal),
//         insight: post.insight ? truncateTo100Words(post.insight) : undefined,
//       }));
//       setPosts(formattedPosts);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchJournals();
//   }, []);




//   return (
//     <div className="flex flex-col h-screen">
//       <div className="p-10 flex-grow flex flex-wrap justify-center gap-6">
//         {currentPosts.map((post) => (
//           <JournalCard
//             key={post._id}
//             title={post.title}
//             journal={post.journal}
//             date={formatDate(post.date)}
//             insight={post.insight as string}
//             id={post._id}
//           />
//         ))}
//         <div className="fixed bottom-0 left-0 right-0 p-4 w-full flex justify-between items-center bg-gray-100">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//           >
//             Prev
//           </button>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => paginate(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;





"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import JournalCard from "@/components/JournalCard";
import { formatDate } from "@/utilities/formatDate";
import { truncateTo100Words } from "../../utilities/truncateTo100";
import Cookies from "js-cookie";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Post {
  _id: string;
  title: string;
  journal: string;
  date: string;
  insight?: string;
  author: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);

  const token = Cookies.get("token");

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const getUserId = async () => {
  //   const response = await axios.get("/api/viewJournals");
  //   const formattedPosts = response.data.data.map((post: Post) => ({
  //     ...post,
  //     journal: truncateTo100Words(post.journal),
  //     insight: post.insight ? truncateTo100Words(post.insight) : undefined,
  //   }));
  //   setPosts(formattedPosts);
  // };

  // useEffect(() => {
  //   getUserId();
  // }, []);

  const fetchJournals = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const response = await axios.get("/api/viewJournals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedPosts = response.data.data.map((post: Post) => ({
        ...post,
        journal: truncateTo100Words(post.journal),
        insight: post.insight ? truncateTo100Words(post.insight) : undefined,
      }));
      setPosts(formattedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);




  return (
    <div className="flex flex-col h-screen">
      <div className="p-10 flex-grow flex flex-wrap justify-center gap-6">
        {currentPosts.map((post) => (
          <JournalCard
            key={post._id}
            title={post.title}
            journal={post.journal}
            date={formatDate(post.date)}
            insight={post.insight as string}
            id={post._id}
          />
        ))}
        <div className="fixed bottom-0 left-0 right-0 p-4 w-full flex justify-between items-center bg-gray-100">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;