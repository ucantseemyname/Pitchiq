import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../atoms/Button';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * App-level error boundary. Catches render/lifecycle errors anywhere below it
 * so a single thrown error can't blank the whole app, and gives the user a way
 * to recover.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface for diagnostics; in production this is where you'd report to an
    // error-tracking service.
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="grid min-h-screen place-items-center bg-canvas px-6 dark:bg-dark-canvas">
        <div className="w-full max-w-md rounded-3xl border border-hairline bg-white p-8 text-center shadow-card dark:border-dark-hairline dark:bg-dark-surface">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted">
            An unexpected error occurred while rendering this page.
          </p>
          {import.meta.env.DEV && (
            <pre className="mt-4 overflow-auto rounded-xl bg-canvas p-3 text-left text-xs text-primary dark:bg-white/5">
              {error.message}
            </pre>
          )}
          <div className="mt-6 flex justify-center gap-2">
            <Button onClick={this.handleReset}>Try again</Button>
            <Button variant="ghost" onClick={() => (window.location.href = '/')}>
              Go home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
