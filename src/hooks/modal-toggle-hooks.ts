import { useState, useEffect } from "react";

/**
 * モーダルの表示・非表示を切り替えるためのカスタムフック
 * @param {string} elementId - モーダルの要素ID
 * @returns {{isShow: boolean, onClickToggleVisibility: () => void}} モーダルの表示状態と表示切り替え用の関数を含むオブジェクト
 */
const useModalToggleHooks = (elementId: string) => {
  const [isShow, setIsShow] = useState(false);

  const onClickToggleVisibility = () => {
    setIsShow((current) => !current);
  };

  // コンポーネントがマウントされた後にイベントリスナーを追加
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isShow) return;

      const isClickInside = (event.target as Element).closest(elementId);
      if (!isClickInside) {
        setIsShow(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isShow, elementId]);

  return { isShow, onClickToggleVisibility };
};

export default useModalToggleHooks;
