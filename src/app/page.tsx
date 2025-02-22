import { Main } from '@/components/main/main';
import { QUERY_KEYS } from '@/constants';
import { FIRST_PAGE } from '@/constants/view';
import { NextPageProps } from '@/types';

export default async function Page({
  searchParams,
}: Omit<NextPageProps, 'params'>) {
  const searchObject = await searchParams;
  const searchTerm = searchObject?.[QUERY_KEYS.NAME]?.toString() ?? '';
  const page = Number(searchObject?.[QUERY_KEYS.PAGE]) || FIRST_PAGE;

  return <Main searchTerm={searchTerm} page={page} />;
}
