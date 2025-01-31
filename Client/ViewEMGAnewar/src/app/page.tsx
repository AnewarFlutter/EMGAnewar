import {getVehicules} from "@/actions/getVehicules"
import { CardVehicules } from "@/components/layout/CardVoiture"

export default async function Home () {
  const vehicules =  await getVehicules()
    return (
      <CardVehicules vehicules={vehicules} />
    )
}