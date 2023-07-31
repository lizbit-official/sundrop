import React, { MouseEventHandler, ReactElement } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  children?: ReactElement;
  label?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * A simple button that will render children
 * or the provided `label` prop as contents.
 *
 * @param children Child component to render as button content, takes precedence over `label`.
 * @param label Alternative way to provide string button content.
 * @param className Classes to apply to the button, optional.
 * @param disabled Whether the button should render disabled.
 * @param isLoading Whether the button should render a loading icon.
 * @param variant Type of button to render, either 'primary' or 'secondary'.
 * @param onClick Click handler to run when clicked.
 */
const Button = ({
  children,
  label = '',
  className = '',
  disabled = false,
  isLoading = false,
  variant = 'primary',
  onClick,
}: ButtonProps) => (
  <button
    className={[styles[variant], className].join(' ')}
    onClick={onClick}
    disabled={disabled}
  >
    {isLoading && <span>loading </span>}
    <span>{children ?? label}</span>
  </button>
);

export default Button;
