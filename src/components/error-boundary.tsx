import React from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallback: FallbackRender }>, { error: Error | null }> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) {
      return fallback({ error });
    }
    return children;
  }
}
