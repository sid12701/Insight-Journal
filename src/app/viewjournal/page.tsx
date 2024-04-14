"use client";
import axios from "axios";
import React, { useEffect } from "react";
import JournalCard from "@/components/JournalCard";
import { formatDate } from "@/utilities/formatDate";
import { truncateTo100Words } from "../../utilities/truncateTo100";



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

  const getUserId = async () => {
    const response = await axios.get("/api/viewJournals");
    console.log(response.data.data);
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
    <div>
      {/* <button onClick={getUserId}>Click</button> */}
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
