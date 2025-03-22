import HeroSection from "@/components/ClientComponents/HeroSection";

export default async function Home() {
  try {
    
    return (
      <div>
        <HeroSection />
      </div>
    );
  } catch (error) {
    console.log("err ==>", error);
    return <h2>ERROR HERE</h2>;
  }
}
