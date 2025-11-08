import dynamic from "next/dynamic";
const OurIslandLanding = dynamic(() => import("./OurIslandLanding"), { ssr: false });

export default function Page() {
  return <OurIslandLanding />;
}
