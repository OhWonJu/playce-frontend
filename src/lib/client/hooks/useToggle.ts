import { useState } from "react";

export default function useToggle(
  onFunc: Function,
  offFunc: Function,
): [boolean, () => void] {
  const [isOn, setIsOn] = useState(false);

  function toggler() {
    const nextIsOn = !isOn;
    setIsOn(!isOn);
    if (nextIsOn) onFunc();
    else offFunc();
  }

  return [isOn, toggler];
}
