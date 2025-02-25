import { getCards } from '~/service/handlers';
import type { Route } from './+types/cards-block';
import styles from './cards-block.module.scss';
import { QUERY_KEYS } from '~/constants';
import { FIRST_PAGE, PAGE_OFFSET } from '~/constants/view';
import { data, Outlet } from 'react-router';
import { CardsList } from '~/components/shared/cards-list/cards-list';
import { Pagination } from '~/components/shared/pagination/pagination';

export function meta() {
  return [
    { title: 'Star Trek' },
    { name: 'description', content: 'Client for Star Trek API' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get(QUERY_KEYS.PAGE) ?? FIRST_PAGE);
  const searchTerm = url.searchParams.get(QUERY_KEYS.NAME) ?? '';

  const cardsResponse = await getCards({ name: searchTerm, page });

  return data({ cardsResponse });
}

// interface Props extends PropsWithChildren {
//   cardsResponse: Promise<SpacecraftsResponse>;
//   spacecraftId?: string;
// }

export default function CardsBlock({ loaderData }: Route.ComponentProps) {
  const cards = loaderData.cardsResponse;
  // const cards = use(cardsResponse);
  // const spacecraftResponse = spacecraftId ? getSpacecraft(spacecraftId) : null;

  const {
    page: { pageNumber, totalPages },
  } = cards ?? { page: { pageNumber: 0, totalPages: 0 } };

  return (
    <>
      <div className={styles.container}>
        <CardsList cards={cards} />
        <Outlet />
        {/* <CardDetails spacecraftResponse={spacecraftResponse} /> */}
      </div>
      <Pagination
        currentPage={pageNumber + PAGE_OFFSET}
        totalPages={totalPages}
      />
    </>
  );
}
