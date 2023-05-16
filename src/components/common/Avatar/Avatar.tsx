import { FC, useRef } from "react";
import cn from "clsx";

import { useUserAvatar } from "@lib/client/hooks/useUserAvatar";

interface Props {
  className?: string;
  children?: any;
}

const Avatar: FC<Props> = ({ className }) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  let { userAvatar } = useUserAvatar();

  const rootClassName = cn(
    className,
    {},
    "inline-block rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear",
  );

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar ?? "" }}
      className={rootClassName}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
