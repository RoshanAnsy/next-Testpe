import HomeDesign from "@/components/common/HomeDesign";
import { Search } from "@/components/common/Search";
import {HowToUse, AiTest} from "@/components/common/HowToUse";

export default function Home() {
  return (
    <div>
      <HomeDesign/>
      <Search/>
      <AiTest/>
      <HowToUse/>
    </div>
  );
}
