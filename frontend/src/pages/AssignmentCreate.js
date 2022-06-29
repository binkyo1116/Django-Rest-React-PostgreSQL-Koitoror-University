// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Form, Input, Button, Divider } from "antd";
// import QuestionForm from "./QuestionForm";
// import { MinusCircleOutlined } from '@ant-design/icons';

// // import React, { useState, useEffect } from "react";
import React, { useState } from "react";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Divider  } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import QuestionForm from "./QuestionForm";
// import Hoc from "../hoc/hoc";
// import { createASNT as createASNTAction } from "../redux/actions/assignments";
import { createASNT as createASNTAction } from "../redux";
// import { createASNT } from "../redux";

// const FormItem = Form.Item;

const defaultFormItemLayout = {
    // labelCol: {
    //     xs: { span: 6 }
    // },
    wrapperCol: {
        xs: { span: 12 }
    }
};

export default function AssignmentCreate(props) {

    const [formCount, setFormCount] = useState(1);

    const hooksData = useSelector(state => {
      // console.log('CREATE ASSIGMENT STATE', state)
      return {
        token: state.auth.token,
        username: state.auth.username,
        loading: state.assignments.loading
      };
    })

    const dispatch = useDispatch()

    // function getASNTSDetail(token, id) {
    // //   return () => dispatch(getASNTSDetailAction(token, id))
    //   return dispatch(getASNTSDetailAction(token, id))
    // }

    function createASNT(token, asnt) {
    //   return () => dispatch(createASNTAction(token, asnt))
      return dispatch(createASNTAction(token, asnt))
    }


    const add = () => {
        setFormCount(prevCount => prevCount + 1);
    };

    const remove = () => {
        setFormCount(prevCount => prevCount - 1);
    };

    const onFinish = (values) => {

        console.log("Received values of form: ", values);

        const questions = [];

        for (let i = 0; i < values.questions.length; i += 1) {
            console.log(values);

            questions.push({
                title: values.questions[i].question,
                choices: values.questions[i].choices,
                answer: values.questions[i].answer,
                order: i
            });
        }

        const asnt = {
            teacher: hooksData.username,
            title: values.title,
            questions
        };

        createASNT(hooksData.token, asnt);

        // console.log(asnt);

    };

    const [form] = Form.useForm();

    const questions = [];


    for (let i = 0; i < formCount; i += 1) {
        questions.push(
            <div key={i}>

                <QuestionForm id={i}  {...props} />

                {questions.length > 0 ? (
                    <Button
                        type="danger"
                        className="dynamic-delete-button"
                        onClick={() => remove()}
                        icon={<MinusCircleOutlined />}
                        disabled={questions.length === 0}
                    >
                        Remove Above Field
                    </Button>
                ) : null}
                <Divider />
            </div>
        );
    }

    return (
        <Form form={form} {...defaultFormItemLayout} onFinish={onFinish}
        >
            <Form.Item
                name="title"
                label="Title: "
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            {questions}



            <Form.Item>
                <Button type="secondary" onClick={add}>
                    Add question
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>

        </Form>
    );
}


// const mapStateToProps = state => {
//     return {
//         // token: state.auth.token,
//         username: state.auth.user
//         // loading: state.assignments.loading
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         createASNT: (asnt) => dispatch(createASNTAction(asnt))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AssignmentCreate);




// // class AssignmentCreate extends React.Component {
// export default function AssignmentCreate(props) {

//   // console.log('PROPS Assignment Create ----> ', props)
//   const form = Form.useForm(); 
//   // console.log('FORM  ----> ', form)

//   // state = {
//   //   formCount: 1
//   // };

//   const [state, setState] = useState({ formCount: 1 });

//   // console.log('LOCAL STATE', state)
  
//   // useEffect(() => {
//   //       form.setFieldsValue({
//   //           keys: []
//   //       });
//   //   }, []);

//   // const [questions, setQuestions] = useState([]);
//   // const questions = [];

//   // console.log('LOCAL questions', questions)

//   const hooksData = useSelector(state => {
//     // console.log('CREATE ASSIGMENT STATE', state)
//     return {
//       token: state.auth.token,
//       // username: state.auth.username,
//       username: state.auth.profile.username,
//       loading: state.assignments.loading
//     };
//   })

//   const dispatch = useDispatch()

//   function getASNTSDetail(token, id) {
//     return () => dispatch(getASNTSDetailAction(token, id))
//   }

//   function createASNT(token, asnt) {
//     return () => dispatch(createASNTAction(token, asnt))
//   }

//   const remove = () => {
//     const { formCount } = state;
//     setState({
//       formCount: formCount - 1
//     });
//   };

//   const add = () => {
//     const { formCount } = state;
//     setState({
//       formCount: formCount + 1
//     });
//   };

//   // const handleSubmit = e => {
//   // const handleSubmit = async (values) => {
//   const onFinish = async (values) => {
//     // if(!values.questions) return;
//     // e.preventDefault();
//     // props.form.validateFields((err, values) => {
//     // form.validateFields().then(async (err, values) => {
//     console.log("Received values of form: ", values);
//     const questions = [];
//     // for (let i = 0; i < values.questions.length; i += 1) {
//     for (let i = 0; i < values.questions.length; i++) {
//       // console.log(' values.questions', values.questions)
//       questions.push({
//         title: values.question[i],
//         choices: values.questions[i].choices.filter(el => el !== null),
//         answer: values.answers[i]
//       });
//     }
//     console.log('PROPS question1  ----> ', question)
//     const asnt = {
//       teacher: hooksData.username,
//       title: values.title,
//       questions
//     };
//     createASNT(hooksData.token, asnt);
//   };
//   const onFinishFailed = (errorInfo) => {
//       console.log('Failed:', errorInfo);
//   };

//   // render() {
//   const questions = [];
//   for (let i = 0; i < state.formCount; i += 1) {
//     // console.log("questions", questions);          
//     questions.push(
//       <Hoc key={i}>
//         {questions.length > 0 ? (
//           // <Icon
//           //   className="dynamic-delete-button"
//           //   type="minus-circle-o"
//           //   disabled={questions.length === 0}
//           //   onClick={() => this.remove()}
//           // />
//           // <MinusCircleOutlined 
//           //   // className="dynamic-delete-button" 
//           //   // style={{ color: "rgba(0,0,0,.25)"}}
//           //   // disabled={questions.length === 0}
//           //   onClick={() => remove()}
//           // />
//           // <Input prefix={<MinusCircleOutlined />}
//           //     className="dynamic-delete-button" 
//           //     // style={{ color: "rgba(0,0,0,.25)"}} 
//           //     disabled={questions.length === 1}
//           //     onClick={() => remove(k)}
//           //     // placeholder="Question choice" 
//           // />
//           <Button
//               className="dynamic-delete-button" 
//               style={{ color: "rgba(0,0,0,.25)", borderRadius: 10}} 
//               disabled={questions.length === 1}
//               onClick={() => remove(k)}
//               icon={<MinusCircleOutlined />}
//               // placeholder="Question choice" 
//             > 
//               {/* Question choice */}
//           </Button>
//         ) : null}
//         {/* <QuestionForm id={i} {...props} form={form} /> */}
//         <QuestionForm id={i} {...props} />
//         <Divider />
//       </Hoc>
//     );


//   }
//   return (
//     // <Form onSubmit={this.handleSubmit}>
//     <Form 
//         // onFinish={handleSubmit}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         // autoComplete="off"
//         // form={form}
//     >

//       <h1>Create an assignment</h1>
//       {/* <FormItem label={"Title: "}>
//         {getFieldDecorator(`title`, {
//           validateTrigger: ["onChange", "onBlur"],
//           rules: [
//             {
//               required: true,
//               message: "Please input a title"
//             }
//           ]
//         })
//       } */}
//       <FormItem 
//           name="title" 
//           label={"Title: "} 
//           validateTrigger={["onChange", "onBlur"]}  
//           rules={[
//               { 
//                 required: true, 
//                 message: "Please input a title"  
//               }
//             ]} 
//       >

//         <Input placeholder="Add a title" />

//       </FormItem>
//       {questions}
//       {/* {console.log("questionsRendered", questions)} */}
//       <FormItem>
//         {/* <Button type="secondary" onClick={this.add}> */}
//         <Button 
//             shape="dashed"
//             type="secondary"
//             onClick={add} 
//             style={{ width: "60%" }} 
//             icon={<PlusCircleOutlined />}
//         >

//           {/* <Icon type="plus" />*/}
//           {/* <Input prefix={<PlusCircleOutlined 
//             // className="dynamic-delete-button" 
//             // style={{ color: "rgba(0,0,0,.25)" }}
//           />}/>  */}
//           Add question 
//         </Button>
//       </FormItem>
//       <FormItem>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </FormItem>
//     </Form>
//   );
//   // }
// }

// // const mapStateToProps = state => {
// //   return {
// //     token: state.auth.token,
// //     username: state.auth.username,
// //     loading: state.assignments.loading
// //   };
// // };


// // const mapDispatchToProps = dispatch => {
// //   return {
// //     createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
// //   };
// // };

// // export default connect(
// //   mapStateToProps,
// //   mapDispatchToProps
// // )(AssignmentCreate);
