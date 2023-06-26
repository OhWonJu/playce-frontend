import { useUI } from "@components/ui";
import React from "react";

export default function Policy() {
  const { windowView, displayWindow } = useUI();

  return (
    <div>
      {windowView === "POLICY_TEST1" && <span>Policy 1</span>}
      {windowView === "POLICY_TEST2" && <span>Policy 2</span>}
      {windowView === "POLICY_TEST3" && <span>Policy 3</span>}
      {windowView === "POLICY_TEST4" && <span>Policy 4</span>}
    </div>
  );
}
