import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list-with-id.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);


  /**
   * Stocke l'url à appeler
   */
  //private quizUrl = '../mocks/quiz-list-woth-id.mock.ts';

  constructor(private http: HttpClient) {
  }
  /*
  getQuizzes(){
    this.http.get<Quiz[]>(this.quizUrl).subscribe({
      next: (quizzesimported) => {
        this.quizzes = quizzesimported;
        console.log('Quiz chargés dans le service:', this.quizzes);
        this.quizzes$.next(this.quizzes);
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.quizzes$.next(this.quizzes);
      }
    });
  }*/

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    const maxId = this.quizzes.length > 0 ? Math.max(...this.quizzes.map(q => q.id)) : 0;
    const quizToAdd = {
      ...quiz,
      id:maxId +1
    };
    this.quizzes.push(quizToAdd);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz){
    this.quizzes = this.quizzes.filter(q => q !== quiz);
    this.quizzes$.next(this.quizzes);
  }
}
