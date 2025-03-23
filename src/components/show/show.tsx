import { PropsWithChildren } from 'react';
import { Skeleton } from '../skeleton/skeleton';

interface Props extends PropsWithChildren {
  condition: boolean;
  fallback?: React.ReactNode;
}

export function Show({ condition, children, fallback = <Skeleton /> }: Props) {
  if (condition) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
