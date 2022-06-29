import React, { useState } from "react";
import { Steps, Button } from "antd";

const Step = Steps.Step;

export default function Questions (props) {

  const [state, setState] = useState({
    current: 0
  });

  function next() {
    const current = state.current + 1;
    setState({ current });
  }

  function prev() {
    const current = state.current - 1;
    setState({ current });
  }

  const { current } = state;
  const { questions } = props;
  return (
    <div>
      <Steps progressDot current={current}>
        {questions.map((q, index) => (
          <Step key={index} />
        ))}
      </Steps>
      <div>{questions[current]}</div>
      <div>
        {current < questions.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === questions.length - 1 && (
          <Button type="primary" onClick={() => props.submit()}>
            Submit
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
