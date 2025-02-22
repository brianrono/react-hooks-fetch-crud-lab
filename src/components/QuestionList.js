import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const url = "http://localhost:4000/questions"
  useEffect(()=> {
    fetch(url)
    .then((res)=>res.json())
    .then((questions)=> setQuestions(questions))
  },[])

  function handleDelete(id){
    fetch(`url/${id}`, {
      method: "DELETE",})
      .then((res)=> res.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
    }

  function handleUpdate(id, correctIndex){
    fetch (`url/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({correctIndex}),
    })
    .then((res)=> res.json())
    .then((updatedQuestion)=>{
      const updatedQuestions = questions.map((question)=> {
        if (question.id === updatedQuestion.id) return updatedQuestion
        return question
      });
      setQuestions(updatedQuestions);
      });
    }

  const questionsToDisplay = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDelete={handleDelete}
      onChange={handleUpdate}
    />
  ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionsToDisplay} 
      </ul>
    </section>
  );
}

export default QuestionList;