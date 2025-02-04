import React, {
  Component,
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
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

export class Button<
  E extends ElementType = typeof defaultElement,
> extends Component<ButtonProps<E>> {
  render() {
    const {
      as,
      className = '',
      children,
      loading,
      customProperties,
      style,
      ...rest
    } = this.props;

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
}

export default Button;
