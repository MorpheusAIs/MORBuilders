import Grid from "@/components/Grid";
import Logo from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { Client } from "@notionhq/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/SearchModal";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function Home() {
  const db = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  db.results.reverse();

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div
          className="max-w-screen-xl px-4 mx-auto flex justify-between py-4 relative z-50 gap-1"
          data-aos="fade"
        >
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-2 w-full justify-end sm:justify-center">
            <SearchModal data={db.results} />
          </div>
          <Button variant={"default"} className="rounded-full">
            Get listed
          </Button>
        </div>
        <main className="container mx-auto">
          <div className="px-4 md:px-0" data-aos="fade" data-aos-delay="250">
            <header className="mb-4 md:mb-4 max-w-screen-xl mx-auto text-center p-6 border border-[#0E5F3E] rounded-3xl relative overflow-hidden md:min-h-[477px] min-h-[338px] flex items-center flex-col justify-center">
              <div className="absolute inset-0">
                <Grid />
              </div>
              <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full flex">
                  <div className="bg-gradient-to-l from-black w-full h-full"></div>
                  <div className="bg-gradient-to-r from-black w-full h-full"></div>
                </div>
              </div>
              <div className="relative mb-4" data-aos="fade"
                data-aos-delay="250">
                <Badge>Coming soon</Badge>
              </div>
              <h1
                className="text-4xl md:text-7xl font-black mb-4 relative"
                data-aos="fade"
                data-aos-delay="500"
              >
                STAKE MOR <br /> TOWARDS BUILDERS
              </h1>
              <p
                className="text-lg md:text-2xl max-w-3xl mx-auto font-mono relative"
                data-aos="fade"
                data-aos-delay="600"
              >
                Access Smart Agents, AI Models & Support The Open Source Project
                Of Your Choice.
                {/* Each project selects how to reward those Staking
              MOR toward them. */}
              </p>
            </header>
          </div>

          <div
            data-aos="fade"
            data-aos-delay="1000"
            className="max-w-screen-xl mx-auto w-full bg-background rounded-3xl overflow-hidden border border-border"
          >
            {/* <div
              id="filters"
              className="flex flex-wrap gap-4 justify-center bg-background py-3 px-6 border-b border-border"
            >
              
            </div> */}
            {/* {project.properties.URL ? project.properties.URL.url : '#'} */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {
                // eslint-disable-next-line
                db.results.map((project: any) => (
                  <Link
                    href={`/builder/${project.id}`}
                    key={project.id}
                    className="group"
                    data-aos="fade"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden group-hover:border-[#0E5F3E] group-hover:border-2 group-hover:-translate-y-1 transition-all duration-300">
                      {project.properties.img && (
                        <Image
                          src={project.properties.img.url ? project.properties.img.url : "/"}
                          alt={project.name}
                          width={295}
                          height={197}
                        />
                      )}
                      <div className="p-2 md:p-5">
                        <h3 className="text-lg font-semibold">
                          {project.properties.Name.title[0].plain_text}
                        </h3>
                        {project.properties.Tags.multi_select.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-1 md:mt-2">
                            {project.properties.Tags.multi_select.map(
                              // eslint-disable-next-line
                              (tag: any) => (
                                <Badge
                                  key={tag.name}
                                  variant={"secondary"}
                                  className="rounded-full"
                                >
                                  {/* <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div> */}
                                  <span className="text-sm">{tag.name}</span>
                                </Badge>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </main>
        <footer className="mt-4  font-mono text-sm text-muted-foreground w-full max-w-screen-xl mx-auto px-5 py-8 ">
          <p className="mb-4 text-lg md:text-xl" data-aos="fade">
            MOR.BUILDERS IS FOR INFORMATIONAL PURPOSES ONLY. ALL PROJECTS
            INDEPENDENTLY DETERMINE THE TYPE OF REWARDS THEY PROVIDE TO MOR
            STAKERS. VENICE PROVIDES A PRO ACCOUNT TO THOSE THAT STAKE MOR
            TOWARD THEIR BUILDER ADDRESS.
          </p>
          <div className="flex justify-center items-center">
            <Logo />
          </div>
        </footer>
      </div>
    </>
  );
}
