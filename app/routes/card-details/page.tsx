import { data } from 'react-router';
import { getSpacecraft } from '~/service/handlers';
import type { Route } from './+types/page';
import { CardDetails } from '~/components/card-details/card-details';

export async function loader({ params }: Pick<Route.LoaderArgs, 'params'>) {
  const { spacecraftId } = params;
  const spacecraftResponse = await getSpacecraft(spacecraftId);
  return data({ spacecraftResponse });
}

export default function CardsDetailsWrapper({
  loaderData,
}: Pick<Route.ComponentProps, 'loaderData'>) {
  const { spacecraftResponse } = loaderData;

  return <CardDetails spacecraft={spacecraftResponse.spacecraft} />;
}
