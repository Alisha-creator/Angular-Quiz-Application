import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  user_name:string = "";
  quiz_questionsList : any = [];
  currentQuestion : number = 0;
  score_points : number = 0;
  counter = 60;
  correctAnswer : number = 0;
  incorrectAnswer : number = 0;
  interval$:any;
  progress_bar : string = "0";
  isQuizCompleted : boolean = false;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.user_name = localStorage.getItem("particpant_name")!;
    this.getAllQuizQues();
    this.startCounter();
  }

  getAllQuizQues(){
    this.questionService.getQuizQuesJson().subscribe(res =>{
      this.quiz_questionsList = res.Questions;
    })
  }

  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQuestionNumber:number, option:any){
    if(currentQuestionNumber === this.quiz_questionsList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct){
      this.score_points += 2;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercentage();
      },1000);
    }
    else{
      setTimeout(()=>{
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.getProgressPercentage();
        this.score_points -= 2;
      },1000)
    };
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe(value=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter++;
        this.score_points -= 2;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe()
    }, 700000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
    this.progress_bar = "0";
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuizQues();
    this.score_points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
  }

  getProgressPercentage(){
    this.progress_bar = ((this.currentQuestion/this.quiz_questionsList.length)*100).toString();
    return this.progress_bar;
  }

}
