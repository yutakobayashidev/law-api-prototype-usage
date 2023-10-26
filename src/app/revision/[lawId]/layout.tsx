"use client";
import { Suspense } from "react";
import Loading from "./loading";

/**
 * 沿革画面のレイアウトを定義するコンポーネント
 * @param param - 子コンポーネント
 * @returns {JSX.Element} 沿革画面のレイアウトコンポーネント
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="col-span-4 md:col-span-10 lg:col-span-12 col-start-1 md:col-start-2">
        {children}
      </div>
    </Suspense>
  );
}
