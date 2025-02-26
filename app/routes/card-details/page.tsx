import { data } from 'react-router';
import { getSpacecraft } from '~/service/handlers';
import type { Route } from './+types/page';
import { CardDetails } from '~/components/card-details/card-details';

export async function loader({ params }: Route.LoaderArgs) {
  const { spacecraftId } = params;
  console.log('spacecraftId: ', spacecraftId);
  const spacecraftResponse = await getSpacecraft(spacecraftId);
  console.log('spacecraftResponse: ', spacecraftResponse);
  return data({ spacecraftResponse });
}

export default function CardsDetailsWrapper({
  loaderData,
}: Route.ComponentProps) {
  console.log('loaderData: ', loaderData);
  const { spacecraftResponse } = loaderData;
  return <CardDetails spacecraft={spacecraftResponse.spacecraft} />;
}
