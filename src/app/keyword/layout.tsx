import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import PageTabGroup from "@/components/tab/page-tab-group";
import KeywordSearchFormGroup from "@/components/search-form-group/keyword-search-form";
import { Suspense } from "react";

/**
 * /keyword 以下のページのレイアウトを定義するコンポーネント
 * @param param
 * @returns {JSX.Element} /law-list のレイアウトコンポーネント
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback>
        <PageTabGroup />
        <div className="col-span-4 px-6 md:px-0 md:col-span-8 md:col-start-3">
          <KeywordSearchFormGroup />
          {children}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
