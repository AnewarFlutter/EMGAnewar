import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TablePage } from "./client";
import { getVehicules } from "@/actions/getVehicules";
import { addBaseUrlToImageUrls } from "@/lib/utils";

export default async function Admin() {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  const vehicules = await getVehicules();

  return (
    <div className="p-3">
      <TablePage initialData={addBaseUrlToImageUrls(vehicules)} />
    </div>
  );
}
