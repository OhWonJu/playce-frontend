import React, { forwardRef, useEffect, useState } from "react";

import useTheme from "@lib/client/hooks/useTheme";
import { useUI, Window } from "@components/ui";
import { Col, Row } from "src/styles/GlobalStyle";
import { Check } from "@components/icons";
import Policy from "@components/policy/Policy";
import { WINDOW_VIEWS } from "@lib/client/store/types/windowType";

// Policy Window View //
const WindowView: React.FC<{
  windowView: string;
  closeWindow(): any;
}> = ({ windowView, closeWindow }) => {
  return (
    <>
      {windowView.includes("POLICY") && (
        <Window onClose={closeWindow}>
          <Policy />
        </Window>
      )}
    </>
  );
};

const WindowUI: React.FC = () => {
  const { displayWindow, closeWindow, windowView } = useUI();
  return displayWindow ? (
    <WindowView windowView={windowView} closeWindow={closeWindow} />
  ) : null;
};
// ------------------------------------------------------------------------------ //

interface PolicyListViewProps {
  setPoliciesAccept: Function;
}

const PolicyListView: React.FC<PolicyListViewProps> = ({
  setPoliciesAccept,
}) => {
  const theme = useTheme();

  // UI //
  const { setWindowView, openWindow, closeWindow, displayWindow } = useUI();

  const policy_context_list: Array<{
    context: string;
    policy: WINDOW_VIEWS;
    required: boolean;
  }> = [
    {
      context: "[필수] 개인정보 수집 및 이용 동의",
      policy: "POLICY_TEST1",
      required: true,
    },
    {
      context: "[필수] 플레이스, 플레이스 스토어 이용 악관",
      policy: "POLICY_TEST2",
      required: true,
    },
    {
      context: "[필수] 만 14세 미만 가입 제한",
      policy: "POLICY_TEST3",
      required: true,
    },
    {
      context: "[선택] 마케팅 활용 및 광고성 정보 수신 동의",
      policy: "POLICY_TEST4",
      required: false,
    },
  ];

  const [policyCheck, setPolicyCheck] = useState<Array<boolean>>([]);
  const [allCheck, setAllCheck] = useState(false);

  useEffect(() => {
    const array = new Array(policy_context_list.length).fill(false);
    setPolicyCheck(array);
  }, []);

  useEffect(() => {
    if (policyCheck.every(isTrue => isTrue)) {
      setAllCheck(true);
      setPoliciesAccept(true);
    } else {
      setAllCheck(false);
      setPoliciesAccept(false);
    }
  }, [policyCheck]);

  const togglePolicyAccept = (index: number) => {
    const newState = policyCheck.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return !c;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setPolicyCheck(newState);
  };

  const toggleAllPolicy = () => {
    if (allCheck) {
      const array = new Array(policy_context_list.length).fill(false);
      setPolicyCheck(array);
    } else {
      const array = new Array(policy_context_list.length).fill(true);
      setPolicyCheck(array);
    }
  };

  const handleShowPolicy = (view: WINDOW_VIEWS) => {
    setWindowView(view);

    if (displayWindow) {
      closeWindow();
    }
    setTimeout(() => openWindow(), 100);
    return;
  };

  return (
    <>
      <WindowUI />
      <div className="justify-center items-center">
        <Row className="items-center">
          <button
            id="checkAll"
            onClick={() => {
              setAllCheck(prev => !prev);
              toggleAllPolicy();
            }}
            className={`w-6 h-6 rounded-full shadow-inner transition`}
            style={{
              backgroundColor: allCheck ? theme.blue_priamry : theme.gray_light,
            }}
          >
            <Check
              className={`w-4 h-4 mx-auto my-auto transition-colors`}
              stroke={allCheck ? theme.white_primary : theme.gray_ligth}
            />
          </button>
          <label
            className="ml-2 mt-1 text-lg font-semibold cursor-pointer"
            htmlFor="checkAll"
          >
            Check all Policy
          </label>
        </Row>
        <Col className="mt-4 mb-5 ml-[3px]">
          <ul className="space-y-5">
            {policy_context_list.map((policy, index) => (
              <li key={index}>
                <Row className="space-x-2 text-sm">
                  {/* Accept Polciy */}
                  <button onClick={() => togglePolicyAccept(index)}>
                    <Row className="space-x-2">
                      <Check
                        className={`w-4 h-4 mx-auto my-auto transition-colors`}
                        stroke={
                          policyCheck[index]
                            ? theme.blue_priamry
                            : theme.gray_primary
                        }
                      />
                      <span style={{ color: theme.gray_primary }}>
                        {policy.context}
                      </span>
                    </Row>
                  </button>
                  {/* Show Policy PDF? */}
                  <button
                    onClick={() => {
                      handleShowPolicy(policy.policy);
                    }}
                  >
                    <span
                      style={{
                        color: theme.gray_primary,
                        textDecorationLine: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      자세히
                    </span>
                  </button>
                </Row>
              </li>
            ))}
          </ul>
        </Col>
      </div>
    </>
  );
};

export default PolicyListView;
