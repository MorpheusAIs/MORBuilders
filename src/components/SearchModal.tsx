"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// eslint-disable-next-line
export function SearchModal({ data }: { data: any[] }) {
  const [open, setOpen] = React.useState(false);

  if (true) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"default"}
            variant="secondary"
            className={cn(
              "rounded-full px-4",
              "sm:h-10 sm:pl-4 sm:w-full sm:max-w-md sm:text-left sm:justify-start sm:gap-2"
            )}
          >
            <Search className="text-muted-foreground" size={20} />
            <span className="sr-only sm:not-sr-only">
              Search for a builder or project...
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[816px] top-0 translate-y-0 sm:rounded-3xl bg-card overflow-hidden h-full sm:max-h-[654px] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Search a project</DialogTitle>
            <DialogDescription>
              Enter a text to search for a project
            </DialogDescription>
          </DialogHeader>
          <ProfileForm data={data} />
        </DialogContent>
      </Dialog>
    );
  }
}
// eslint-disable-next-line
function ProfileForm({ className, data }: { className?: string; data: any[] }) {
  // eslint-disable-next-line
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    // eslint-disable-next-line
    const filtered = data.filter((item: any) => {
      return item.properties.Name.title[0].plain_text
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredApps(filtered);
  }, [searchTerm, data]);

  return (
    <form className={cn("grid items-start h-full sm:max-h-[690px]", className)}>
      <div className="grid gap-2 relative p-4 z-10 pb-0">
        <div className="h-8 -bottom-4 left-0 bg-gradient-to-b from-card absolute w-full"></div>
        <Label htmlFor="email" className="sr-only">
          Search
        </Label>
        <div className="relative flex gap-2 items-center">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            ref={inputRef}
            onChange={handleChange}
            className="bg-white/5 h-12 rounded-full pl-10 pr-4 text-base"
            type="email"
            id="email"
            value={searchTerm}
            placeholder="Search for project..."
          />
          <DialogClose className="sm:hidden" asChild>
            <Button variant={'ghost'} className="rounded-full">Close</Button>
          </DialogClose>
        </div>
      </div>
      <ScrollArea
        style={{
          paddingBlock: 0,
        }}
        className="w-full h-[calc(100vh-64px)] sm:h-[590px] py-0 p-5"
      >
        {/* eslint-disable-next-line */}
        {filteredApps.map((app: any) => {
          // eslint-disable-next-line
          const properties: any = app.properties;
          const name = properties.Name.title[0]?.plain_text;
          const image = properties.Image.files[0]?.file.url;
          const description = properties.Description.rich_text[0]?.plain_text;

          return (
            <Link
              key={app.id}
              href={`/builder/${app.id}`}
              className="flex items-center py-3 hover:bg-black/20 cursor-pointer mx-2 rounded-2xl"
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
      </ScrollArea>
    </form>
  );
}
