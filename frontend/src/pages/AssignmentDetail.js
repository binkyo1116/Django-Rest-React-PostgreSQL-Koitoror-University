import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Skeleton, message } from "antd"
import { useParams } from "react-router-dom"

import Questions from "./Questions";
import Choices from "../components/Choices";
// import { getASNTSDetail as getASNTSDetailAction } from "../redux/actions/assignments";
// import { createGradedASNT as createGradedASNTAction } from "../redux/actions/gradedAssignments";
import { getASNTSDetail as getASNTSDetailAction, createGradedASNT as createGradedASNTAction } from "../redux";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};


export default function AssignmentDetail(props) {
  const params = useParams()

  const [state, setState] = useState({
    usersAnswers: {}
  });

  const hooksData = useSelector(state => {
    return {
      token: state.auth.token,
      currentAssignment: state.assignments.currentAssignment,
      loading: state.assignments.loading,
      username: state.auth.username
    };
  })

  const dispatch = useDispatch()

  function getASNTSDetail(token, id) {
    // return () => dispatch(getASNTSDetailAction(token, id))
    return dispatch(getASNTSDetailAction(token, id))
  }

  function createGradedASNT(token, asnt) {
    return dispatch(createGradedASNTAction(token, asnt))
    // return () => dispatch(createGradedASNTAction(token, asnt))
    // return () => dispatch(getASNTSDetail(createGradedASNTAction(token, asnt)))
  }

  useEffect(() => {
    if (hooksData.token !== undefined && hooksData.token !== null) {
      // getASNTSDetail(hooksData.token, hooksData.match.params.id);
      getASNTSDetail(hooksData.token, params.id);
    }

  }, []);

  const onChange = (e, qId) => {
    const { usersAnswers } = state;
    usersAnswers[qId] = e.target.value;
    setState({ usersAnswers });
  };

  function handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = state;
    const asnt = {
      username: hooksData.username,
      asntId: hooksData.currentAssignment.id,
      answers: usersAnswers
    };
    createGradedASNT(hooksData.token, asnt);
    console.log(asnt)

  }

  const { currentAssignment } = hooksData;
  const { title } = currentAssignment;
  const { usersAnswers } = state;
  return (
    <Hoc>
      {Object.keys(currentAssignment).length > 0 ? (
        <Hoc>
          {hooksData.loading ? (
            <Skeleton active />
          ) : (
            <Card title={title}>
              <Questions
                submit={() => handleSubmit()}
                questions={currentAssignment.questions.map(q => {
                  return (
                    <Card
                      style={cardStyle}
                      type="inner"
                      key={q.id}
                      title={`${q.order}. ${q.question}`}
                    >
                      <Choices
                        questionId={q.order}
                        choices={q.choices}
                        change={onChange}
                        usersAnswers={usersAnswers}
                      />
                    </Card>
                  );
                })}
              />
            </Card>
          )}
        </Hoc>
      ) : null}
    </Hoc>
  );
}
