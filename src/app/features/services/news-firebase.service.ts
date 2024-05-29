import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { NewsFirebase } from '../models/newsFirebase';

@Injectable({
  providedIn: 'root',
})
export class NewsFirebaseService {
  private newsCollection;

  constructor(private firestore: Firestore) {
    this.newsCollection = collection(firestore, 'newsCollection');
  }

  getNews(): Observable<NewsFirebase[]> {
    return collectionData(this.newsCollection, {
      idField: 'id',
    }) as Observable<NewsFirebase[]>;
  }

  addNews(news: {
    title: string;
    source: string;
    published: string;
    url: string;
  }): Observable<string> {
    const promise = addDoc(this.newsCollection, news).then((res) => res.id);
    return from(promise);
  }

  removeNews(newsId: string): Observable<void> {
    const docRef = doc(this.firestore, 'newsCollection/' + newsId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
