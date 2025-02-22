import { Main } from '@/components/main/main';
import { QUERY_KEYS } from '@/constants';
import { FIRST_PAGE } from '@/constants/view';
import { NextPageProps } from '@/types';

export default async function Page({ searchParams, params }: NextPageProps) {
  const searchObject = await searchParams;
  const searchTerm = searchObject?.[QUERY_KEYS.NAME]?.toString() ?? '';
  const page = Number(searchObject?.[QUERY_KEYS.PAGE]) || FIRST_PAGE;
  const paramsObject = await params;
  const { spacecraftId } = paramsObject;

  return (
    <Main searchTerm={searchTerm} page={page} spacecraftId={spacecraftId} />
  );
}
