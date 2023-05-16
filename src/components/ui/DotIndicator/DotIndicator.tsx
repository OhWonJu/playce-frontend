import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Indicator {
  ref: number;
}

interface DotIndicatorProps {
  current: number;
  length: number;
}

const MAX_VISIBLE_INDICATORS = 3;

const DotIndicator: React.FC<DotIndicatorProps> = ({ current, length }) => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(MAX_VISIBLE_INDICATORS - 1);

  useEffect(() => {
    const newIndicators = [];
    for (let i = indicators.length || 0; i < length; i++) {
      newIndicators.push({ ref: i });
    }
    setIndicators(newIndicators);
  }, [length]);

  useEffect(() => {
    if (current < min) {
      setMin(current);
      setMax(current + MAX_VISIBLE_INDICATORS - 1);
      if (max > length) {
        setMax(length);
      }
    }
    if (current > max) {
      setMax(current);
      setMin(current - MAX_VISIBLE_INDICATORS + 1);
      if (min < 0) {
        setMin(0);
      }
    }
  }, [current, length]);

  const getIndicatorClass = (ref: number): string => {
    if (ref === current) {
      return "active";
    }
    if (ref >= min && ref <= max) {
      return "std";
    }
    if (ref === min - 1 || ref === max + 1) {
      return "small";
    }
    // if (ref === min - 2 || ref === max + 2) {
    //   return "micro";
    // }
    return "hidden";
  };

  return (
    <IndicatorsWrapper>
      {indicators.map(indicator => (
        <div key={indicator.ref} className={getIndicatorClass(indicator.ref)} />
      ))}
    </IndicatorsWrapper>
  );
};

export default DotIndicator;

const IndicatorsWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 5px;
    height: 5px;
    margin: 2px;
    border-radius: 50%;
    background-color: ${props => props.theme.gray_light};
    overflow: hidden;
    transition: all 500ms ease-out;
    text-indent: -9999px;

    /* &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 20px;
    } */
  }
  .active {
    /* width: 8px;
    height: 8px;
    margin: 1px; */
    background-color: ${props => props.theme.theme_comparsion_color};
  }
  .small {
    width: 3.5px;
    height: 3.5px;
    margin: 3px;
    /* &:first-child {
      margin-left: 10px;
    }
    &:last-child {
      margin-right: 10px;
    } */
  }
  .micro {
    width: 2px;
    height: 2px;
    margin: 4px;
  }
  .hidden {
    width: 0;
    height: 0;
    margin: 4px 0;
  }
`;
