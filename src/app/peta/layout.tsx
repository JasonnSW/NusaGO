import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MapProvider } from "@/features/peta/context/map-context";
import { PlaceProvider } from "@/features/peta/context/place-context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlaceProvider>
      <MapProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </MapProvider>
    </PlaceProvider>
  );
}
