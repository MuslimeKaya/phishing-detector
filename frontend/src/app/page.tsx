import Image from "next/image";
import { api } from "./lib/api";
import AppTable from "./components/AppTable";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Zararlı Uygulamalar Listesi
        </h2>
      </div>
      <AppTable initialApps={[]} />
    </div>
  );
}
