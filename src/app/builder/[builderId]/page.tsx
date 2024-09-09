import { notFound } from "next/navigation";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Grid from "@/components/Grid";
import Logo from "@/components/Logo";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/BackButton";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

async function getNotionPage(
  pageId: string
): Promise<PageObjectResponse | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response as PageObjectResponse;
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    return null;
  }
}

export interface SpaceProps {
  params: {
    builderId: string;
  };
}

export default async function Page({ params }: SpaceProps) {
  const pageData = await getNotionPage(params.builderId);

  if (!pageData) {
    notFound();
  }

  // eslint-disable-next-line
  const pageProperties: any = pageData.properties;

  const name = pageProperties.Name.title[0]?.plain_text;
  const tags = pageProperties.Tags.multi_select;

  const offering = pageProperties.Offering.rich_text[0]?.plain_text;
  const description = pageProperties.Description.rich_text[0]?.plain_text;
  //   const address = pageProperties.Address.rich_text[0].plain_text;
  const website = pageProperties.URL ? pageProperties.URL.url : "#";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <pre>{JSON.stringify(pageData.properties, null, 2)}</pre> */}
      <main className="container mx-auto">
        <div className="max-w-screen-xl w-full mx-auto py-4">
          <BackButton />
        </div>
        <div className="px-4 md:px-0" data-aos="fade" data-aos-delay="250">
          <header className=" rounded-b-none max-w-screen-xl mx-auto text-center p-6 border border-[#0E5F3E] rounded-3xl relative overflow-hidden md:min-h-[477px] min-h-[338px] flex items-center flex-col justify-center">
            <div className="absolute inset-0">
              <Grid />
            </div>
            <div className="relative z-10 text-center">
              {pageProperties.Image.files[0]?.file.url && (
                <Image
                  src={pageProperties.Image.files[0]?.file.url}
                  alt="hello"
                  width={295}
                  height={197}
                  className="rounded-2xl mx-auto"
                />
              )}

              {name && (
                <h1 className="text-2xl font-geist-sans font-black mt-4">
                  {name}
                </h1>
              )}
              {description && (
                <p className="text-2xl font-mono">{description}</p>
              )}
              <a
                className="inline-flex items-center underline text-[#20DC8E]"
                href={website}
              >
                Website <ExternalLink height={16} />
              </a>
              {tags?.length > 0 && (
                <div className="flex gap-1 flex-wrap mt-1 md:mt-2">
                  {tags?.map(
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
            <div className="w-full h-full absolute inset-0 flex items-center justify-center">
              <div className="h-full w-full flex">
                <div className="bg-gradient-to-l from-black w-full h-full"></div>
                <div className="bg-gradient-to-r from-black w-full h-full"></div>
              </div>
            </div>
          </header>
        </div>
        <section className=" rounded-t-none bg-card mb-4 md:mb-12 max-w-screen-xl mx-auto text-center p-6 border border-border rounded-3xl relative overflow-hidden md:min-h-[477px] min-h-[338px] flex items-center flex-col justify-center">
          <h2
            className="text-4xl font-black mb-4 relative"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Details
          </h2>
          <p className="mb-4 text-lg md:text-xl" data-aos="fade">
            When Builder Rewards go live you will be able to Stake MOR
            toward&nbsp;
            {name}
            .
            <br />
            <br />
            This action will direct part of the Morpheus token emissions each
            day toward the {name} project.
            <br />
            <br />
            Each project selects how to reward those Staking MOR toward them.
            <br />
            <br />
            Offering: &nbsp;{offering}
          </p>
        </section>
      </main>
      <footer className="mt-4 md:mt-12 font-mono text-sm text-muted-foreground w-full max-w-screen-xl mx-auto px-5 py-8 md:py-16">
        <p className="mb-4 text-lg md:text-xl" data-aos="fade">
          MOR.BUILDERS IS FOR INFORMATIONAL PURPOSES ONLY. ALL PROJECTS
          INDEPENDENTLY DETERMINE THE TYPE OF REWARDS THEY PROVIDE TO MOR
          STAKERS. VENICE PROVIDES A PRO ACCOUNT TO THOSE THAT STAKE MOR TOWARD
          THEIR BUILDER ADDRESS.
        </p>
        <div className="flex justify-center items-center" data-aos="fade">
          <Logo />
        </div>
      </footer>
    </div>
  );
}
