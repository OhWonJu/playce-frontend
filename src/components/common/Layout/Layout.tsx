import { ReactNode, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { LoadingDots, useUI } from "@components/ui";
import { useAcceptCookies } from "@lib/client/hooks/useAcceptCookies";
import useTheme from "@lib/client/hooks/useTheme";
import useWindowSize from "@lib/client/hooks/useWindowSize";
import {
  DESKTOP_PLAYER_WIDTH,
  MOBILE_LIMIT,
  TABLET_LIMIT,
} from "constants/constants";
import { Player } from "@components/player";
import { Navigator } from "../Navigator";
import { PlayerBottomSheet } from "@components/playerBottomeSheet";
// import { TestDropDown, TestDropDown2 } from "../NavDroupDown";
// import { Cross } from "@components/icons";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

// ------------ UI Protocol?? ------------ //
// UI -> View(어떤 뷰) -> UI Component(공통 액션 처리) -> <UILayout>{Component}</UILayout>(실제 개별 UI)
// ---------------------------------------------------------------------------------------------- //

// Modal //
const Modal = dynamic(() => import("@components/ui/Modal"), {
  loading: Loading,
  ssr: false,
});

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  // const mobileForm: boolean = ["LOGIN_VIEW", "FORGOT_VIEW"].includes(modalView);

  // let modalTitle: string = "";
  // switch (modalView) {
  //   case "LOGIN_VIEW":
  //     modalTitle = "LOG IN";
  //     break;
  //   case "FORGOT_VIEW":
  //     modalTitle = "FIND ACCOUNT";
  //     break;
  //   default:
  //     modalTitle = "";
  // }

  return (
    <Modal onClose={closeModal}>
      {/* {modalView === "LOGIN_VIEW" && <LoginView />}
      {modalView === "FORGOT_VIEW" && <ForgotPassword />}
      {modalView === "PRODUCT_REVIEW" && <Review />} */}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};
// ---------------------------------------------------------------------- //
// Side bar //
const SidebarView: React.FC<{
  sidebarView: string;
  closeSidebar(): any;
  // links: LinkProps[];
}> = ({ sidebarView, closeSidebar }) => {
  return (
    // <Sidebar left={left} onClose={closeSidebar}>
    //   {sidebarView === "CART_VIEW" && <CartSidebarView />}
    //   {/* {sidebarView === "SHIPPING_VIEW" && <ShippingView />} */}
    //   {/* {sidebarView === "PAYMENT_VIEW" && <PaymentMethodView />} */}
    //   {/* {sidebarView === "CHECKOUT_VIEW" && <CheckoutSidebarView />} */}
    //   {sidebarView === "MOBILE_NAV_VIEW" && <SideNavbar category={"all"} />}
    //   {/* {sidebarView === "MOBILE_MENU_VIEW" && <MenuSidebarView links={links} />} */}
    // </Sidebar>
    null
  );
};

const SidebarUI: React.FC = () => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return displaySidebar ? (
    <SidebarView sidebarView={sidebarView} closeSidebar={closeSidebar} />
  ) : null;
};
// --------------------------------------------------------------------------------- //
// Drop Down //
const DropDownView: React.FC<{
  dropDownView: string;
  closeDropDown(): any;
}> = ({ dropDownView, closeDropDown }) => {
  return (
    <>
      {/* {dropDownView === "SEARCH_VIEW" && (
        <SearchDropDown onClose={closeDropDown} />
      )}
      {dropDownView === "STORE_VIEW" && (
        <StoreDropDown onClose={closeDropDown} />
      )}
      {dropDownView === "TEST_VIEW2" && (
        <TestDropDown2 onClose={closeDropDown} />
      )} */}
    </>
  );
};

const DropDownUI: React.FC = () => {
  const { displayDropDown, closeDropDown, dropDownView } = useUI();
  return displayDropDown ? (
    <DropDownView dropDownView={dropDownView} closeDropDown={closeDropDown} />
  ) : null;
};

const PlayerUI: React.FC = () => {
  const { displayPlayer } = useUI();

  return displayPlayer ? <Player /> : null;
};

const PlayerBottomSheetUI: React.FC = () => {
  const { displayPlayer } = useUI();

  return displayPlayer ? <PlayerBottomSheet /> : null;
};

const ViewModeUI: React.FC = () => {
  const { width } = useWindowSize();
  const { viewMode, setViewMode } = useUI();

  useEffect(() => {
    if (!width) {
      // setViewMode("INIT");
      return;
    }

    if (width < MOBILE_LIMIT && viewMode !== "MOBILE") {
      setViewMode("MOBILE");
    } else if (
      width >= MOBILE_LIMIT &&
      width < TABLET_LIMIT &&
      viewMode !== "TABLET"
    ) {
      setViewMode("TABLET");
    } else if (width >= TABLET_LIMIT && viewMode !== "DESKTOP") {
      setViewMode("DESKTOP");
    }
  }, [width]);

  return null;
};
// ----------------------------------------------------------------------------------- //

interface Props {
  id: string;
  children: ReactNode;
  pageProps: {
    // pages?: Page[];
    // categories: Category[];
  };
  path: string;
}

// Nav bar Render되지 않는 예외 경로
const NAV_INABLE_PATH = ["/join"];
const LOGO_VISIVLE = [];

const Layout: React.FC<Props> = ({ id, children, pageProps, path }) => {
  const theme = useTheme();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  const [display, setDisplay] = useState(false);
  const { viewMode } = useUI();

  // 더 최적화 할 방법은..?
  const navAble = !NAV_INABLE_PATH.includes(path);

  const logoVisible = path != "/";

  return (
    <div
      id={id}
      className="relative h-full w-full mx-auto transition-colors duration-150"
      style={{
        backgroundColor: theme.background_color,
        maxWidth: 2460,
      }}
    >
      <ViewModeUI />
      <main className="fit">{children}</main>
      <ModalUI />
      <SidebarUI />
      <DropDownUI />
      <PlayerUI />
      {viewMode !== "DESKTOP" ? <PlayerBottomSheetUI /> : null}
      <Navigator logoVisible={logoVisible} />
    </div>
  );
};

export default Layout;
