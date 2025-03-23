import { ElementType } from 'react';

interface Props<E extends ElementType = ElementType> {
  TagName?: E;
  amountElements?: number;
  height?: number;
  width?: number | string;
}

export function Skeleton({
  TagName = 'div',
  amountElements = 1,
  height = 8,
  width = 'full ',
}: Props) {
  const renderElements = () => {
    const elements = Array.from({ length: amountElements }, (_, index) => (
      <div
        key={index}
        className={`h-${height} animate-pulse border border-gray-200 bg-gray-300`}
      ></div>
    ));

    return elements;
  };

  return (
    <TagName className={`w-${width} animate-pulse rounded bg-gray-300`}>
      {renderElements()}
    </TagName>
  );
}
