import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Services from "./components/Services";
import News from "./components/News";
import Story from "./components/Story";
import Work from "./components/Work"

export default function Home() {
  return (
    <div>
      <Hero />
      <Partners />
      <Services />
      <News />
      <Story />
      <Work />
    </div>
  );
}
