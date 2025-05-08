"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArticleModel } from "@/models/ArticleModel";
import { usePrisma } from "@/services/prisma";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function SpecificArticlePage() {
  const prisma = usePrisma();
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleModel | undefined>();

  const rawName = params.name;
  const name =
    typeof rawName === "string"
      ? rawName
      : Array.isArray(rawName)
      ? rawName[0]
      : "";
  const formattedName = capitalizeFirstLetter(name.split("-").join(" "));

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await prisma.getArticleByName(name as string);
        setArticle(response);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des données de l'article : ${error}`
        );
      }
    };

    fetchArticleData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (article?.id) {
      prisma.incrementArticleViews(article.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.id]);

  const handleLike = async () => {
    if (!article) return;
    const updated = await prisma.incrementArticleLikes(article.id);
    setArticle(updated);
  };

  const chunkDescriptions = (descs: string[], groupSize: number) => {
    const chunks = [];
    for (let i = 0; i < descs.length; i += groupSize) {
      chunks.push(descs.slice(i, i + groupSize));
    }
    return chunks;
  };

  if (!article) {
    return (
      <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
        <div className="w-full md:w-3xl my-10">
          <div className="flex flex-col justify-center space-y-5">
            <section>
              <div className="flex items-center">
                <Button
                  onClick={() => router.back()}
                  variant="default"
                  className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
                >
                  <ChevronLeft />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold ml-1">
                  {formattedName}
                  <span className="text-[#41806C]">.</span>
                </h1>
              </div>
              <hr className="border-b-2 border-[#41806C] w-36 my-4" />
            </section>
          </div>
        </div>
      </main>
    );
  }

  const descChunks = chunkDescriptions(article.descs || [], 3);

  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-10">
        <div className="flex flex-col justify-center space-y-5">
          <section>
            <div className="flex items-center">
              <Button
                onClick={() => router.back()}
                variant="default"
                className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
              >
                <ChevronLeft />
              </Button>
              <h1 className="text-xl md:text-2xl font-bold ml-1">
                {formattedName}
                <span className="text-[#41806C]">.</span>
              </h1>
            </div>
            <hr className="border-b-2 border-[#41806C] w-36 my-4" />
          </section>

          <Button
            variant="link"
            onClick={handleLike}
            className="group hover:no-underline"
          >
            <span className="transition-transform group-hover:scale-95">
              Mettre un j&apos;aime
            </span>
            <Heart className="h-5 w-5 transition-transform group-hover:scale-125 text-red-500 ml-2" />
          </Button>

          <div className="flex md:flex-row md:justify-between md:items-center">
            <p className="text-color-secondary">
              Temps de lecture{" "}
              <strong className="text-black">{article.readTimeMinutes}</strong>{" "}
              minutes.
            </p>
            <p className="font-thin">
              Publié le{" "}
              <span className="font-semibold underline">{article.date}</span>
            </p>
          </div>

          <div className="article-content space-y-8">
            {descChunks.map((chunk, index) => (
              <div key={index} className="space-y-4">
                {chunk.map((desc, i) => (
                  <p key={i} className="text-color-secondary">
                    {desc}
                  </p>
                ))}
                {article.screens?.[index] && (
                  <Image
                    src={`/assets/article/${article.screens[index]}`}
                    alt={`Écran ${article.id} - ${article.title}`}
                    width={800}
                    height={600}
                    className={`object-cover w-full rounded-lg mx-auto h-full ${
                      index % 2 ? "max-w-[800px]" : "max-w-[500px]"
                    }`}
                    priority={article.id === 1}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <p className="font-thin">
              <span className="font-bold">{article.views}</span> vue{article.views > 1  && 's'}.
            </p>
            <p className="font-thin flex space-x-1">
              <span className="font-bold">{article.likes}</span> j&apos;aime
              {article.likes > 1 && "s"}.
              <Heart className="h-5 w-5 text-red-500 ml-1" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
