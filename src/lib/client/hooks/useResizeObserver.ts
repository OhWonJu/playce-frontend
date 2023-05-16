import { useCallback, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Props {
  callback: ResizeObserverCallback;
  element: any;
}

const useResizeObserver = ({ callback = (): void => null, element }: Props) => {
  const current = element && element.current;

  const observer = useRef(null);

  useEffect(() => {
    // if we are already observing old element
    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    const resizeObserverOrPolyfill = ResizeObserver;
    observer.current = new resizeObserverOrPolyfill(callback);
    observe();

    return () => {
      if (observer && observer.current && element && element.current) {
        observer.current.unobserve(element.current);
      }
    };
  }, [callback, current, element]);

  const observe = useCallback(() => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current);
    }
  }, [element, observer]);

  //   const observe = () => {
  //     if (element && element.current && observer.current) {
  //       observer.current.observe(element.current);
  //     }
  //   };
};

export default useResizeObserver;
