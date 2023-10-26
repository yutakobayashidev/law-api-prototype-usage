import useModalToggleHooks from "./modal-toggle-hooks";


const API_SPECIFICATION_URL = {
  url: process.env.NEXT_PUBLIC_API_SPECIFICATION_URL || "",
  title: "API 仕様書",
  label: "API 仕様書(Swagger UI)",
};

const useHeaderDropdownHooks = () => {
  const { isShow, onClickToggleVisibility } =
    useModalToggleHooks("#headerDropdown");

  // ヘッダーのヘルプリンク(API仕様書)のURL
  const swaggerUiUrl = API_SPECIFICATION_URL;

  return { isShow, swaggerUiUrl, onClickToggleVisibility };
};

export default useHeaderDropdownHooks;
