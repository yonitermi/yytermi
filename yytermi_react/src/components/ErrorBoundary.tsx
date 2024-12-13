import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000033] to-black text-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">משהו השתבש</h1>
            <p className="mb-4">אנא רענן את הדף או נסה שוב מאוחר יותר</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-blue rounded hover:opacity-90 transition-opacity"
            >
              רענן דף
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}