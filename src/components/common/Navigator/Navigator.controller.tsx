import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import NavigatorView from "./Navigator.view";

import { Link } from "@components/ui";
import { useQuery } from "@tanstack/react-query";
import { _ME } from "@lib/server/api/user/me";
import { useMe } from "@lib/client/hooks/useMe";

interface Link {
  href: string;
  label: string;
}

interface NavigatorProps {
  links?: Link[];
  logoVisible: boolean;
}

const Navigator: FC<NavigatorProps> = ({ links, logoVisible }) => {
  const router = useRouter();

  return (
    <NavigatorView
      logoVisible={logoVisible}
      pathName={router.pathname.split("/")[1]}
    />
  );
};

export default Navigator;
