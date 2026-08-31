import About from "./About";
import Editorial from "./Editorial";
import Hero from "./Hero";
import MagazinePreview from "./MagazinePreview";
import Publisher from "./Publisher";
import Quote from "./Quote";


export default function HomeMain() {
  return (
    <main>
      <Hero />
      <About />
      <MagazinePreview/>
      <Editorial />
      <Publisher />
      <Quote />
    </main>
  );
}