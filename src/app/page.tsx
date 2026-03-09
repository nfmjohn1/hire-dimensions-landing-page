import Header from "./components/Header";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Comparison from "./components/Comparison";
import SocialProof from "./components/SocialProof";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <Comparison />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
