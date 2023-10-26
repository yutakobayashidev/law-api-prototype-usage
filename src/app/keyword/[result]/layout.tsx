import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { Suspense } from "react";
import Loading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default Layout;
