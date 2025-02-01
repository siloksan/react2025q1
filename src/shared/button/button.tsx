import {
  ComponentProps,
  CSSProperties,
  ElementType,
  PropsWithChildren,
} from 'react';

import classes from './button.module.scss';

interface ButtonOwnProps<E extends ElementType = ElementType>
  extends PropsWithChildren {
  as?: E;
  loading?: boolean;
  customProperties?: CSSProperties;
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

export function Button<E extends ElementType = typeof defaultElement>(
  props: ButtonProps<E>
) {
  const {
    as,
    className = '',
    children,
    loading,
    customProperties,
    style,
    ...rest
  } = props;
  const TagName: ElementType = (as === 'a' ? 'a' : as) ?? defaultElement;

  return (
    <TagName
      className={`${classes.button} ${className}`}
      data-loading={loading ? '' : undefined}
      style={{ ...style, ...customProperties }}
      {...rest}
    >
      {children}
    </TagName>
  );
}
