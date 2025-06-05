import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joke } from '../model/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private pathService: string;
  private subject: BehaviorSubject<Joke | null> = new BehaviorSubject<Joke | null>(null);

  constructor(private httpClient: HttpClient) {
    const isLocal: boolean = window.location.hostname === 'localhost';
    this.pathService = isLocal
      ? 'http://localhost:8080/api/joke'
      : 'http://bobapp-back:8080/api/joke';

    this.getRandomJoke();
  }

  public getRandomJoke(): void {
    this.httpClient.get<Joke>(this.pathService).subscribe((joke: Joke) => this.subject.next(joke));
  }

  public joke$(): Observable<Joke | null> {
    return this.subject.asObservable();
  }
}
