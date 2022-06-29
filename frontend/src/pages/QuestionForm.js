// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, Space } from "antd";
// import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import Hoc from "../hoc/hoc";

import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// const FormItem = Form.Item;
const QuestionForm = props => {
  return (
    <Form.List name='questions'>
      {() => {
        return (
          <div>
            <Form.Item
              name={[props.id, 'question']}
              label='Question'
              rules={[{ required: true }]}
            >
              <Input placeholder='Question ' />
            </Form.Item>

            <Form.Item
              name={[props.id, 'answer']}
              label='Answers'
              rules={[{ required: true }]}
            >
              <Input placeholder='Answer ' />
            </Form.Item>

            <Form.List name={[props.id, 'choices']}>
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index) => (
                    <Space key={field.key} align='baseline'>
                      <Form.Item
                        name={[index]}
                        noStyle
                        label='Choices'
                        rules={[{ required: true }]}
                      >
                        <Input placeholder='Choices ' />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add an answer choice
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </div>
        );
      }}
    </Form.List>
  );
};

export default QuestionForm;


// let id = 0;

// export default function QuestionForm (props) {

//     const remove = (k) => {
//         if (keys.length === 1) return;
//         const nextkeys = keys.filter(key => key !== k)
//         setKeys(...nextKeys);
//       };

//       const add = () => {
//         const nextKeys = keys.concat(++id);
//         setKeys(...nextKeys);
//       };

//     const formItems = keys.map((k, index) => (

//         <FormItem
//             name={`questions[${props.id}]choices[${k}]`}
//             label={index === 0 ? "Choices" : ""}
//             validateTrigger={["onChange", "onBlur"]}
//             rules={[{ required: true, whitespace: true, message: "Please input a choice to the question" }]}
//         >

//             {
//                 keys.length > 1 ? (

//                     <Button
//                         className="dynamic-delete-button"
//                         style={{ color: "rgba(0,0,0,.25)", borderRadius: 10 }}
//                         disabled={keys.length === 1}
//                         onClick={() => remove(k)}
//                         icon={<MinusCircleOutlined />}
//                     />

//                 ) : null
//             }
//         </FormItem>
//         ));
//     return (
//         <Hoc>
//             <FormItem name={`question[${props.id}]`} label={"Question: "} validateTrigger={["onChange", "onBlur"]} rules={[{ required: true, message: "Please input a question" }]} >

//                 <Input placeholder="Please input a question" />

//             </FormItem>

//             <FormItem
//                 name={`answers[${props.id}]`}
//                 label={"Answer: "}
//                 validateTrigger={["onChange", "onBlur"]}
//                 rules={[{ required: true, message: "Please input an answer to this question" }]}
//             >

//                 <Input placeholder="What is the answer?" />

//             </FormItem>

//             {formItems}

//             <FormItem>
//                 <Button
//                     shape="dashed"
//                     onClick={add}
//                     style={{ width: "60%" }}
//                     icon={<PlusCircleOutlined />}
//                 >

//                     Add an answer choice
//                 </Button>
//             </FormItem>

//         </Hoc>
//     );

// }
