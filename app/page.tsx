import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Work } from "@/components/sections/Work";
import { Disciplines } from "@/components/sections/Disciplines";
import { Control } from "@/components/sections/Control";
import { Approach } from "@/components/sections/Approach";
import { Studio } from "@/components/sections/Studio";
import { Commission } from "@/components/sections/Commission";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Trust />
      <Work />
      <Disciplines />
      <Control />
      <Approach />
      <Studio />
      <Commission />
    </main>
  );
}
