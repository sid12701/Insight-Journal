"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import JournalCard from "@/components/JournalCard";
import { formatDate } from "@/utilities/formatDate";
import { truncateTo100Words } from "../../utilities/truncateTo100";
import Cookies from "js-cookie";
import {useRouter} from 'next/navigation';



interface Post {
  _id: string;
  title: string;
  journal: string;
  date: string; 
  insight?: string;
  author: string;
  __v?: number; 
}



const Page = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // const [isClient, setIsClient] = useState(false);
  // // const token = Cookies.get("token")
  // const router = useRouter();

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // const token = isClient ? Cookies.get("token") : null;
  // if(!token){
  //   router.push("/login");
  // }

  const getUserId = async () => {
    const response = await axios.get("/api/viewJournals");
    const formattedPosts = response.data.data.map((post: Post) => ({
      ...post,
      journal: truncateTo100Words(post.journal),
      insight: post.insight ? truncateTo100Words(post.insight) : undefined,
    }));
    setPosts(formattedPosts); 
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div className="p-10 flex flex-wrap justify-center gap-6"> 
      {posts.map((post) => (
        <JournalCard 
          key={post._id}
          title={post.title}
          journal={post.journal}
          date={formatDate(post.date)}
          insight={post.insight as string}
          id={post._id} 
        />
      ))}
    </div>
  );
};

export default Page;
