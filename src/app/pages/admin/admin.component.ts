import {Component, OnChanges, OnInit} from '@angular/core';
import {BackendApiService} from '../../@core/services/backend-api/backend-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: any;

  constructor(private backendApiService: BackendApiService) {
  }

  ngOnInit(): void {
    this.backendApiService.getUsers().subscribe(data => {
      if (data.success) {
        this.users = data.response.sort((a, b) => {
          const x = a.type;
          const y = b.type;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        this.users.map(item => {
          if (item.type === 'admin' ) {
            item.type = 'Amministratore';
          } else if (item.type === 'student') {
            item.type = 'Studente';
          }
          if (item.validity) {
            item.validity = 'Si';
          } else if (!item.validity) {
            item.validity = 'No';
          }
          return item;
        });
      }
    });
  }

  changeValidity(username: string, value: boolean) {
    console.log('Changing validity of ' + username + ' to ' + value);
    this.users.map(item => {
      if (item.username === username) {
        item.validity = value ? 'Si' : 'No';
      }
    });
    this.backendApiService.changeValidity(username, value).subscribe(response => {
      // console.log(response);
    });
  }

  delete(username: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        this.users.splice(i, 1);
      }
    }
    this.backendApiService.deleteUser(username).subscribe(response => {
      // console.log(response);
    });
  }
}
