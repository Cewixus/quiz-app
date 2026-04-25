import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {decode} from 'html-entities'
import clsx from 'clsx'
import './quizPage.css'

export default function QuizPage({questions, handleSelected, selected, handleCheckAnswers, playAgain, score, gameIsOver, disabled, isLoading, startQuiz}){
    const questionElements = questions.map(q => {
        return(<div key={q.id} className='question-container'>
            <h1>{decode(q.question)}</h1>
            {q.answers.map((a, i) => {
                const selectedClass = clsx({
                    selected: selected[q.id] === a,
                    correct: gameIsOver && a === q.correct,
                    incorrect: gameIsOver && selected[q.id] === a && a !== q.correct,
                    other: gameIsOver && selected[q.id] !== a && a !== q.correct
                }
                )
                return(<button
                            key={i}
                            className={selectedClass}
                            onClick={() => handleSelected(q.id, a)}
                            disabled={disabled}
                            >{decode(a)}</button>)
            })}
        </div>)
    }) 
    
    return(
        <section className="quiz-page">
            {questionElements}
            <div className='final-container'>
                {!gameIsOver && <button className='check-button' onClick={handleCheckAnswers}>Check answers</button>}
            {gameIsOver &&
                <>
                    <p>You scored {score}/5 correct answers</p>
                    <button className='check-button' onClick={playAgain}>Play again</button>
                </>}
            </div>
        </section>
    )
}