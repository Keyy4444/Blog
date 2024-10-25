import Blog from "@/components/Blog/Blog";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className="container">
      <HeroSection />
      <Blog />
    </div>
  );
}
