"use client";

import ErrorMessageBlock from "@/components/search-result/error-message-block";

/**
 * 法令画面のエラー画面
 * @returns {JSX.Element} 法令画面のエラー画面
 */
const Error = ({ error }: { error: Error }) => {
  return <ErrorMessageBlock message={error.message} />;
};

export default Error;
