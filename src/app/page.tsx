import BingeProducts from "@/components/ClientComponents/BingeProducts";
import HeroSection from "@/components/ClientComponents/HeroSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <BingeProducts />
    </div>
  );
}
