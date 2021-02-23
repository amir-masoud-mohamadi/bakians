import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'mapir-angular-test';
  center: Array<number> = [51.367918, 35.712706];
  apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkN2ZlMTI0ZDVmMjRkYTA3ZDlmMWQ5MzM4NjAwYTljZGQ2MDAzYTg4MGE3NGE2ZmViNDg3OTUwMGUyNzdiNzNhMDNjMzEzYjlhMTc2OTA3In0.eyJhdWQiOiIxMjkxOCIsImp0aSI6ImNkN2ZlMTI0ZDVmMjRkYTA3ZDlmMWQ5MzM4NjAwYTljZGQ2MDAzYTg4MGE3NGE2ZmViNDg3OTUwMGUyNzdiNzNhMDNjMzEzYjlhMTc2OTA3IiwiaWF0IjoxNjE0MDYwMjM5LCJuYmYiOjE2MTQwNjAyMzksImV4cCI6MTYxNjU2MjIzOSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.VimkTn40KxmYGKafT9zCVLZM_TRtGmqIdhq8PSED76iirwTsp8tomdpxJP9qd77udTNnDB5NYybH15vV7kqTuLMjXUd8CsEIpH08SSnwsTP2JJmnu5EyTlMPsdiWnt7bQaE1JJd51swFP5vjP-7myp6yu0uD8rA94LMmY2wbF3fUljO5UKVWZeDBoYhvowssysWzicZAZDLKHji1DwftyPuCrziO3pEt5qldQiJrGVq7TgnzsKSugbK-Dhtjimdt-l_S-xnXnrtx7iIeTHKJfGKIDzEc6X8Xu1GqSi5nNHjSAzPdPEGG3xQNDCO7tO4DVeq3matk5rq8lhIwAcmFaw';
  constructor() { }

  ngOnInit() {
  }

}
