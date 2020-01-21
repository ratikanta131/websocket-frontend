import { Component, OnInit } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private serverUrl = 'http://localhost:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;
  messages: string[] = [];

  constructor() {}

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      // that.stompClient.subscribe( '/topic/chat', (message) => {
      //   if (message.body) {
      //     this.messages.push(message.body);
      //   }
      // });
    });
  }


  subscribeToCrimeUser1(message) {
    this.stompClient.subscribe( '/topic/crime', (message) => {
      if (message.body) {
        console.log('Message from crime topic for user 1 : ' + message.body);
        this.messages.push('Message from crime topic for user 1 : ' + message.body);
      }
      });
  }

  subscribeToCrimeUser2(message) {
    this.stompClient.subscribe( '/topic/crime', (message) => {
      if (message.body) {
        console.log('Message from crime topic for user 2 : ' + message.body);
        this.messages.push('Message from crime topic for user 2 : ' + message.body);
      }
    });

    
  }


  subscribeToMyAdminQueue(){
    this.stompClient.subscribe( '/queue/toadmin', (message) => {
      if (message.body) {
        console.log('Message only to admin : ' + message.body);
        this.messages.push('Message only to admin : ' + message.body);
      }
    });
  }


  subscribeToMyRatikantaQueue(){
    this.stompClient.subscribe( '/queue/toratikanta', (message) => {
      if (message.body) {
        console.log('Message only to ratikanta : ' + message.body);
        this.messages.push('Message only to ratikanta : ' + message.body);
      }
    });
  }

  publishCrimeNews(message) {
    this.stompClient.send('/app/send/msg/tocrime' , {}, message.value);
  }

  sendMessageToAdmin(message) {
    this.stompClient.send('/app/send/msg/toadmin' , {}, message.value);
  }

  sendMessageToRatikanta(message) {
    this.stompClient.send('/app/send/msg/toratikanta' , {}, message.value);
  }

}
