import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onUpload: (title: string, link: string) => void;
}

export const UploadReplay = ({ onUpload }: Props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && link.trim()) {
      onUpload(title.trim(), link.trim());
      setTitle("");
      setLink("");
    }
  };

  return (
    <section className="container py-16 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Загрузить новый реплей</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название реплея"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="url"
          placeholder="Ссылка на видео (YouTube)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <Button type="submit" className="w-full">
          Загрузить
        </Button>
      </form>
    </section>
  );
};
