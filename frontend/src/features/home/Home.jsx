import SliderSection from "./components/SliderSection";
import SliderNav from "./components/SliderNav";
import SectionCluster from "./components/SectionCluster";
import PrendasSection from "./components/PrendasSection"; // ← IMPORTANTE

function Home() {
    return (
        <>
            <SliderNav/>
            <SliderSection/>
            <PrendasSection/>   {/* ← AGREGARLO AQUÍ */}
            <SectionCluster/>
        </>
    )
}

export default Home;
