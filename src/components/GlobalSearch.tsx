"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GlobalSearch({
  data,
}: {
  // eslint-disable-next-line
  data: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return item.properties.Name.title[0].plain_text
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredApps(filtered);
  }, [searchTerm, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-30" ref={containerRef}>
      <div
        className={`relative ${
          isOpen ? "rounded-t-2xl" : "rounded-full"
        } bg-input text-white`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a Builder or project..."
          className="w-full h-10 pl-10 pr-4 bg-transparent outline-none"
          onFocus={handleFocus}
          onChange={handleChange}
          value={searchTerm}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={20}
        />
      </div>
      {isOpen && (
        <div className="absolute w-full bg-input rounded-b-2xl shadow-lg max-h-96 overflow-y-auto">
          {filteredApps.map((app) => {
            // eslint-disable-next-line
            const properties: any = app.properties;
            const name = properties.Name.title[0]?.plain_text;
            const image = properties.Image.files[0]?.file.url;
            const description = properties.Description.rich_text[0]?.plain_text;

            return (
              <Link
                key={app.id}
                href={`/builder/${app.id}`}
                className="flex items-center p-3 hover:bg-black/20 cursor-pointer"
              >
                <Image
                  src={image}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-md mr-3"
                />
                <div>
                  <h3 className="text-white font-semibold">{name}</h3>
                  {description && (
                    <p className="text-gray-400 text-sm">{description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
