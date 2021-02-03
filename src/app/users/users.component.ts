import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { orderBy } from 'lodash';

import { UsersService } from '../shared/users.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loadControl = false;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];
  users: User[] = [];
  loading: boolean = false;
  pageNav = { offset: 5, skip: 0, isList: 'short' };
  inputValue = '';
  sortColumnName = 'id';
  sortArrow: 'asc' | 'desc' = 'asc';

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => {
          if (!params.isList) {
            this.users = [];
          } else {
            this.pageNav.isList = params.isList;
            this.pageNav.skip = params.page
              ? (+params.page - 1) * this.pageNav.offset
              : 0;
          }

          this.loadControl = !!params.isList;
        }),
        switchMap((params: Params) => {
          if (!this.users.length && params.isList) {
            this.loading = true;
            return this.service.fetch(params.isList);
          } else {
            return of(this.users);
          }
        })
      )
      .subscribe(
        (users) => {
          this.users = users;
          this.loading = false;
        },
        (error) => console.log(error)
      );
  }

  loadUsers(isList: string) {
    this.router.navigate(['/users'], {
      queryParams: {
        isList,
      },
    });
  }

  get getAllUsers(): User[] {
    return this.users.filter((user) =>
      user.firstName
        .toLowerCase()
        .includes(this.inputValue.trim().toLowerCase())
    );
  }

  get getUsersOnPage() {
    return this.getAllUsers.slice(
      this.pageNav.skip,
      this.pageNav.skip + this.pageNav.offset
    );
  }

  get countPages() {
    const count = Math.ceil(this.getAllUsers.length / this.pageNav.offset);

    const num = this.pageNav.skip / this.pageNav.offset;

    const nav: Array<number> = [];
    Array(count)
      .fill('')
      .forEach((_, idx) => {
        if (num + 2 >= idx && idx >= num - 2) {
          nav.push(idx + 1);
        }
      });

    return nav.length > 1 ? nav : [];
  }

  sortByColName(columnName: string) {
    this.sortArrow = this.sortArrow === 'asc' ? 'desc' : 'asc';
    this.users = orderBy(this.users, columnName, this.sortArrow);

    this.sortColumnName = columnName;
  }

  filterHandler() {
    if (this.router.url.includes('page=')) {
      this.router.navigate(['/users'], {
        queryParams: { isList: this.pageNav.isList },
      });
    }
  }
}
