import { Component, OnDestroy, OnInit, } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

@Component({
  selector: 'inbox',
  templateUrl: 'inbox.template.html',
  styleUrls: ['component.css']
})
export class InboxComponent implements OnDestroy, OnInit {

  public nav: any;
  userId: any;
  users: any;
  currentUser: any;
  talkTo:any;
  otherUsers:any;
  message:any;
  chatHistory:any;

  public constructor(private restService: RestService) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    this.talkTo=null;
    this.userId = localStorage.getItem('userId');
    this.restService.getAccounts().subscribe(data => {
      this.users = data.data;
      this.currentUser = this.users.filter(user => user.userId == this.userId);
      this.otherUsers = this.users.filter(user => user.userId !== this.userId);
      console.log(this.currentUser);
    }
    )
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  selectUser(user){
    this.talkTo=user;
    this.restService.getChats(this.currentUser[0].userId,this.talkTo.userId).subscribe(data=>{
      this.chatHistory=data.data;
      console.log(this.chatHistory);
    })
  }

  reply(){
    let chatMessage = {
      to:this.talkTo.userId,
      message: this.message
    }
    this.restService.createChat(chatMessage).subscribe(data=>{
      this.restService.getChats(this.currentUser[0].userId,this.talkTo.userId).subscribe(data=>{
        this.chatHistory=data.data;
        this.message='';
        console.log(this.chatHistory);
      })
    })

    
  }



}
