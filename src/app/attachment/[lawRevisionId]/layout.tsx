import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
