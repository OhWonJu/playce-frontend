import {
  DragHandlers,
  MotionValue,
  MotionProps,
  Transition,
  Spring,
} from "framer-motion";

export type SheetEvents = {
  onOpenStart?: () => void;
  onOpenEnd?: () => void;
  onCloseStart?: () => void;
  onCloseEnd?: () => void;
  onSnap?: (index: number) => void;
};

export type SheetDetent = "full-height" | "content-height";

type CommonProps = MotionProps & {
  isMain?: boolean;
  className?: string;
};

// 생성될 시트의 Props
export type SheetProps = {
  isMain: boolean;
  isOpen: boolean;
  modalMode: boolean;
  children: React.ReactNode;
  onClose: () => void;
  rootId?: string;
  mountPoint?: Element;
  useSnapPoint?: boolean;
  snapPoints?: number[];
  detent?: SheetDetent;
  fixedHeight?: number;
  initialSnap?: number; // index of snap points array
  springConfig?: Omit<Spring, "type">;
  disableDrag?: boolean;
  prefersReducedMotion?: boolean;
} & SheetEvents &
  React.HTMLAttributes<HTMLDivElement>;

export type SheetContainerProps = Omit<
  CommonProps,
  "initial" | "animate" | "exit" | "onAnimationComplete"
> & {
  children: React.ReactNode;
};

export type SheetDraggableProps = Omit<
  CommonProps,
  | "drag"
  | "dragElastic"
  | "dragConstraints"
  | "dragMomentum"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
> & {
  children?: React.ReactNode;
  disableDrag?: boolean;
};

export type SheetBackdropProps = Omit<
  CommonProps,
  "initial" | "animate" | "exit"
>;

export type SheetDragProps = {
  drag: "y";
  dragElastic: number;
  dragConstraints: any;
  dragMomentum: boolean;
  dragPropagation: boolean;
  onDrag: DragHandlers["onDrag"];
  onDragEnd: DragHandlers["onDragEnd"];
};

// 리덕스 -> 시트의 전해줄 상태값.
export type SheetContextType = {
  y: MotionValue<any>;
  sheetRef: React.MutableRefObject<any>;
  isOpen: boolean;
  progress: MotionValue<any>;
  snapPoints: SheetProps["snapPoints"];
  detent: SheetDetent;
  fixedHeight: SheetProps["fixedHeight"];
  initialSnap: SheetProps["initialSnap"];
  indicatorRotation: MotionValue<number>;
  callbacks: React.MutableRefObject<SheetEvents>;
  dragProps?: SheetDragProps;
  windowHeight: number;
  animationOptions: Transition;
  reduceMotion: boolean;
};

type ContainerComponent = React.ForwardRefExoticComponent<
  SheetContainerProps & React.RefAttributes<any>
>;

type DraggableComponent = React.ForwardRefExoticComponent<
  SheetDraggableProps & React.RefAttributes<any>
>;

type BackdropComponent = React.ForwardRefExoticComponent<
  SheetBackdropProps & React.RefAttributes<any>
>;

type SheetComponent = React.ForwardRefExoticComponent<
  SheetProps & React.RefAttributes<any>
>;

type SheetCompoundComponent = {
  Container: ContainerComponent;
  Header: DraggableComponent;
  Content: DraggableComponent;
  Backdrop: BackdropComponent;
};

export type SheetCompound = SheetComponent & SheetCompoundComponent;
