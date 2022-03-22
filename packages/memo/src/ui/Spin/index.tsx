import React, { FC, memo, ReactNode } from 'react';
import { CircularProgress } from '@mui/material';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import clsx from 'clsx';
import useStyles from './styles';

export const SpinComponent: FC<SpinProps> = ({
  children,
  className,
  color = 'secondary',
  loading,
  wrapperClassName,
  ...props
}) => {
  const classes = useStyles();
  if (!loading) return null;
  return (
    <div className={clsx(classes.rootSpin, className)} data-testid="SpinPage">
      <div
        className={clsx(classes.childrenWrapper, wrapperClassName, {
          [classes.loading]: loading,
        })}
      >
        {children}
      </div>
      <div
        className={clsx(classes.progressWrapper, {
          [classes.loading]: loading,
        })}
      >
        <CircularProgress {...props} color={color} />
      </div>
    </div>
  );
};

const Spin = memo(SpinComponent);
Spin.displayName = 'Spin';
export default Spin;

export interface SpinProps extends CircularProgressProps {
  loading?: boolean;
  wrapperClassName?: string;
  children?: ReactNode;
}
