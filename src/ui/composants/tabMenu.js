import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { useRouter } from "next/router"; // Utilisez useRouter de Next.js

function TabMenuComponent() {
  const [activeIndex, setActiveIndex] = useState(3);
  const items = [
    { label: "Dashboard", icon: "pi pi-home" },
    { label: "Clients", icon: "pi pi-chart-line" },
    { label: "Artisans", icon: "pi pi-list" },
  ];

  return (
    <div className="card flex items-center justify-center py-4">
      <TabMenu
        className="text-black"
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
    </div>
  );
}

export default TabMenuComponent;
