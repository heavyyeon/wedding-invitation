import TitleCard from "@/components/TitleCard";
import CastingSection from "@/components/CastingSection";
import InvitationSection from "@/components/InvitationSection";
import WhenWhereSection from "@/components/WhenWhereSection";
import GallerySection from "@/components/GallerySection";
import DirectionsSection from "@/components/DirectionsSection";
import AccountSection from "@/components/AccountSection";
import BgmToggle from "@/components/BgmToggle";
import ToastProvider from "@/components/ToastProvider";

export default function Home() {
  return (
    <ToastProvider>
      <main>
        <TitleCard />
        <CastingSection />
        <InvitationSection />
        <WhenWhereSection />
        <GallerySection />
        <DirectionsSection />
        <AccountSection />
      </main>
      <BgmToggle />
    </ToastProvider>
  );
}
