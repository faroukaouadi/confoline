import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Services from "./components/Services";
import News from "./components/News";
import Story from "./components/Story";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <div className="bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]">
      <Hero />
      <Partners />
      </div>
      <Services />
      <Testimonials />
      <News />
      <Story />
      <Work />
    </div>
  );
}
