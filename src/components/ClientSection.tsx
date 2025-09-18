import Image from "next/image";
import type { StaticImageData } from "next/image";

export interface ClientProps {
  icon?: React.JSX.Element;
  image?: string; // when using public/ paths like "/clients/m2nxt.png"
  importedImage?: StaticImageData; // when using static imports like import m2nxt from "@/assets/m2nxt.png"
  name: string;
  url?: string;
}

const clients: ClientProps[] = [
  { image: "/clients/m2nxt.png", name: "M2NXT", url: "#" },
  { image: "/clients/barbarian.webp", name: "Barbarian", url: "#" },
  { image: "/clients/opticos.svg", name: "Opticos", url: "#" },
  { image: "/clients/quansys.png", name: "Quansys", url: "#" },
  { image: "/clients/dwp-global.png", name: "DWP Global", url: "#" },
  { image: "/clients/vikas-school.png", name: "Vikas School", url: "#" },
  { image: "/clients/planafin.png", name: "Planafin", url: "#" },
  { image: "/clients/Adian.png", name: "Adian", url: "#" },
  { image: "/clients/IR_tech.png", name: "IR Tech", url: "#" },
];

function LogoItem({ client }: { client: ClientProps }) {
  return (
    <div className="text-muted-foreground mx-4 flex h-12 w-32 shrink-0 items-center justify-center transition-opacity hover:opacity-100">
      <a
        href={client.url || "#"}
        target="_blank"
        rel="noreferrer noopener"
        className="flex h-full w-full items-center justify-center"
      >
        {client.icon && <span>{client.icon}</span>}
        {(client.image || client.importedImage) && (
          <Image
            src={(client.importedImage || client.image)!}
            alt={`${client.name} Logo`}
            width={120}
            height={40}
            loading="lazy"
            className="h-10 object-contain opacity-60 grayscale transition-all hover:grayscale-0"
          />
        )}
      </a>
    </div>
  );
}

export default function ClientSection() {
  const firstRow = clients.slice(0, Math.ceil(clients.length / 2));
  const secondRow = clients.slice(Math.ceil(clients.length / 2));

  return (
    <section id="clients" className="container pt-6 pb-6 sm:py-32">
      <h2 className="text-md text-primary mb-8 text-center font-bold lg:text-xl">
        Our Trusted Clients
      </h2>

      <div className="relative space-y-6 overflow-hidden">
        <div className="scroll-left flex">
          {[...firstRow, ...secondRow, ...firstRow].map((client, index) => (
            <LogoItem key={`first-${client.name}-${index}`} client={client} />
          ))}
        </div>

        <div className="scroll-right flex" style={{ transform: "translateX(-50%)" }}>
          {[...secondRow, ...firstRow, ...secondRow, ...firstRow, ...secondRow].map(
            (client, index) => (
              <LogoItem key={`second-${client.name}-${index}`} client={client} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
