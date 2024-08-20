import * as React from "react";
import { SheetContextType } from "./types";

export const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined,
);

// 이런식으로 커스텀 할 수 밖에 없을듯...
export const SubSheetContext = React.createContext<
  SheetContextType | undefined
>(undefined);

// 리덕스 역할 시트의 상태값을 저장해주는것..
// 다중 시트를 사용할 경우 수정해야함.
export const useSheetContext = (isMain: boolean) => {
  // const context = React.useContext(SheetContext);
  let context: any;

  if (isMain) {
    context = React.useContext(SheetContext);
  } else {
    context = React.useContext(SubSheetContext);
  }

  if (!context) throw Error("Sheet context error");
  return context;
};
