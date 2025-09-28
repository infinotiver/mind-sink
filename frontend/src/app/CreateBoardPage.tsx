import { createSink } from "@/api/sinks";
import SinkCreate from "@/components/createsink/SinkCreate";
import { useAuth } from "@/context/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBoardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t: string) => t !== tag));
  };

  const handleCreateSink = () => {
    console.log("Sink created with title:", title);
    console.log("Sink description:", description);
    console.log("Tags:", tags);
    // Add logic to handle sink creation
    const newSinkData = {
      title: title,
      description: description,
      visibility: "private",
      tags: tags,
      user_id: user?.user_id || "",
    };
    if (newSinkData.user_id) {
      createSink(newSinkData);
      alert(`Sink created successfully! 
    Title: ${title}
    Description: ${description}
    Tags: ${tags.join(", ")}`);
      queryClient.invalidateQueries();
      navigate("/dashboard");
    } else {
      console.error("User ID is required to create a sink.");
      alert("An error occured. Please try again later");
    }
  };

  return (
    <div>
      <h1>Create a new Sink</h1>
      <SinkCreate
        tags={tags}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        onCreateSink={handleCreateSink}
      />
    </div>
  );
}
