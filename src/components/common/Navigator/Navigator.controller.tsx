import { FC } from "react";
import { useRouter } from "next/router";

import NavigatorView from "./Navigator.view";

import useTheme from "@lib/client/hooks/useTheme";
import { Link } from "@components/ui";

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

  return (
    <NavigatorView
      logoVisible={logoVisible}
      pathName={router.pathname.split("/")[1]}
    />
  );
};

export default Navigator;
