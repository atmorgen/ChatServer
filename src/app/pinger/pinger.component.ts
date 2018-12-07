import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'app-pinger',
  templateUrl: './pinger.component.html',
  styleUrls: ['./pinger.component.css']
})
export class PingerComponent implements OnInit {

  onlineUsers:any = [];
  checkForPingUsers:any = [];

  constructor(private db:AngularFireDatabase) { }

  ngOnInit() {
    setInterval(() => {
      this.checkOnline()
    }, 300000);
  }

  async checkOnline(){
    this.onlineUsers = await this.getData();
    this.updateIsOnline();
    setTimeout(() => {
      this.checkPing()
    }, 10000);
  }

  async checkPing(){
    this.checkForPingUsers = await this.getData();
    this.removeNoPingUsers()
  }

  getData(){
    let db = this.db;
    //find 'assignments reference in database and subscribe to it
    return new Promise(function(resolve,reject) {
      var dbUpdate = db.database.ref('onlineUsers').once('value',
        snapshot =>{
          var returnArr = [];
          snapshot.forEach(childSnapshot=> {
            var item = childSnapshot.val();
            
            returnArr.push(item);
          });
          resolve(returnArr[0])
      })
    }) 
  }

  updateIsOnline(){
    for(var key in this.onlineUsers){
      this.db.database.ref('onlineUsers/users/' + key).update({'isOnline':false})
    }
  }

  removeNoPingUsers(){
    for(var key in this.checkForPingUsers){
      if(this.checkForPingUsers[key].isOnline == false){
        this.db.database.ref('onlineUsers/users/' + key).remove()
      }
    }
  }

}
