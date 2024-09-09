import Grid from "@/components/Grid";
import Logo from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";
// import { ChevronDown, Filter } from "lucide-react";
import Image from "next/image";

import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// const projects = [
//   {
//     name: "nounspace",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "Akash Network",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
//   {
//     name: "CoinCap",
//     logo: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/170364/487047_33893.png",
//   },
// ];

export default async function Home() {
  const db = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    // filter_properties: ["propertyID1", "propertyID2"],
  });

  // Removing explicit any lint error
  // eslint-disable-next-line
  // console.log(db.results);
  console.log(
    (
      db.results.find(
        (result) =>
          // eslint-disable-next-line
          (result as any).url ===
          "https://www.notion.so/Venice-f9df1f1fe7ff4c33b2f9ad6dcd0a1721"
        // eslint-disable-next-line
      ) as any
    ).properties.Tags.multi_select[0].name
  );

  // properties: {
  //   URL: { id: 'KQO%40', type: 'url', url: null },
  //   Tags: { id: 'KeUA', type: 'multi_select', multi_select: [] },
  //   Image: { id: 'W%5Ei%40', type: 'files', files: [] },
  //   Description: { id: '%5B%5CI%5C', type: 'rich_text', rich_text: [] },
  //   Name: { id: 'title', type: 'title', title: [Array] }
  // },

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="flex justify-center py-4">
          <Logo />
        </div>
        <main className="container mx-auto">
          <div className="px-4 md:px-0">
            <header className="mb-4 md:mb-12 max-w-screen-xl mx-auto text-center p-6 border border-[#0E5F3E] rounded-3xl relative overflow-hidden md:min-h-[477px] min-h-[338px] flex items-center flex-col justify-center">
              <div className="absolute inset-0">
                <Grid />
              </div>
              <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full flex">
                  <div className="bg-gradient-to-l from-black w-full h-full"></div>
                  <div className="bg-gradient-to-r from-black w-full h-full"></div>
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-4 relative">
                STAKE MOR <br /> TOWARDS BUILDERS
              </h1>
              <p className="text-lg md:text-2xl max-w-3xl mx-auto font-mono relative">
                Access Smart Agents, AI Models & Support The Open Source Project
                Of Your Choice.
                {/* Each project selects how to reward those Staking
              MOR toward them. */}
              </p>
            </header>
          </div>

          <div className="max-w-screen-xl mx-auto w-full bg-background rounded-3xl overflow-hidden border border-border">
            {/* <div className="flex flex-wrap gap-4 justify-center bg-background py-3 px-6 border-b border-border">
              <Select>
                <Button variant="outline" className="bg-gray-800 text-white">
                  Salary <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </Select>
              <Select>
                <Button variant="outline" className="bg-gray-800 text-white">
                  Job type <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </Select>
              <Button variant="outline" className="bg-green-800 text-white">
                Engineer
              </Button>
              <Button variant="outline" className="bg-green-800 text-white">
                Remote
              </Button>
              <Button variant="outline" className="bg-gray-800 text-white">
                Remote
              </Button>
              <Button variant="outline" className="bg-gray-800 text-white">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div> */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {
                // eslint-disable-next-line
                db.results.map((project: any) => (
                  // {project.properties.URL && project.properties.URL.url}
                  <div
                    key={project.id}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    {project.properties.Image.files[0]?.file.url && (
                      <Image
                        src={project.properties.Image.files[0]?.file.url}
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
                ))
              }
            </div>
          </div>
        </main>
        <footer className="mt-4 md:mt-12 font-mono text-sm text-muted-foreground w-full max-w-screen-xl mx-auto px-5 py-8 md:py-16">
          <p className="mb-4 text-lg md:text-xl">
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
