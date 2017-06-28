import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import { Color } from "color";
import { View } from "ui/core/view";

import { MockUser } from "./mock-user";
import { MOCKUSERS } from "./mock-users";
import { MockUserService } from "./mock-user.service";

@Component({
  selector: "my-app",
  providers: [UserService, MockUserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  userNum: number = 0;

  @ViewChild("container") container: ElementRef;

  constructor(
    private router: Router,
    private userService: UserService,
    private page: Page,
    private mockUserService: MockUserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login"
    this.curUser(this.userNum); // Set to autofill the mock user (0: Scott, 1: Generic)
  }

  setUser(num: number){
    this.userNum = num;
    this.curUser(this.userNum);
  }
  
  curUser(id: number) {
    this.mockUserService.getUser(id)
      .then(res => {
        this.user.email = res.email;
        this.user.password = res.password;
      });
  }

  submit() {
    //alert("You're using: " + this.user.email);
    console.log(`hello ${new Date()}`);

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.userService.login(this.user)
      .subscribe(
      () => this.router.navigate(["/list"]),
      (error) => alert("Unfortunately we could not find your account.")
      );
  }
  signUp() {
    this.userService.register(this.user)
      .subscribe(
      () => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      },
      () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

}