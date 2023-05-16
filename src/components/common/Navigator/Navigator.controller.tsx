import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";

import {} from "./Navigator.styles";
import NavigatorView from "./Navigator.view";

import useTheme from "@lib/client/hooks/useTheme";
import { SYMBOL_TEXT } from "constants/constants";
import { Link, useUI } from "@components/ui";
import { VIEW_MODES } from "@lib/client/store/types/viewModeType";

interface Link {
  href: string;
  label: string;
}

interface NavigatorProps {
  links?: Link[];
  logoVisible: boolean;
}

const Navigator: FC<NavigatorProps> = ({ links, logoVisible }) => {
  const theme = useTheme();
  const router = useRouter();

  return <NavigatorView logoVisible={logoVisible} />;
};

export default Navigator;
