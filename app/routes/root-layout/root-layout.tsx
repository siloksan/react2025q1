import { getCards } from '~/service/handlers';
import { QUERY_KEYS } from '~/constants';
import { FIRST_PAGE, PAGE_OFFSET } from '~/constants/view';
import { data, Outlet } from 'react-router';
import { CardsList } from '~/components/cards-list/cards-list';
import { Pagination } from '~/components/shared/pagination/pagination';
import type { Route } from './+types/root-layout';

import styles from './root-layout.module.scss';

export function meta() {
  return [
    { title: 'Star Trek' },
    { name: 'description', content: 'Client for Star Trek API' },
  ];
}

export async function loader({ request }: Pick<Route.LoaderArgs, 'request'>) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get(QUERY_KEYS.PAGE) ?? FIRST_PAGE);
  const searchTerm = url.searchParams.get(QUERY_KEYS.NAME) ?? '';
  const cardsResponse = await getCards({ name: searchTerm, page });

  return data({ cardsResponse });
}

export default function RootLayout({
  loaderData,
}: Pick<Route.ComponentProps, 'loaderData'>) {
  const cards = loaderData.cardsResponse;

  const {
    page: { pageNumber, totalPages },
  } = cards ?? { page: { pageNumber: 0, totalPages: 0 } };

  return (
    <>
      <div className={styles.container}>
        <CardsList cards={cards} />
        <Outlet />
      </div>
      <Pagination
        currentPage={pageNumber + PAGE_OFFSET}
        totalPages={totalPages}
      />
    </>
  );
}
