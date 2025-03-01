export type WithTestId<T = object> = T & { testid?: string };
export interface NextPageProps {
  params: Promise<{ spacecraftId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
