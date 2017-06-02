import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  template: `
    <StackLayout>
      <Image src="res://logo_login" stretch="home" horizontalAlignment="center"></Image>
      <TextField hint="Email Address" keyboardType="email" [(ngModel)]="email"
        autocorrect="false" autocapitalizationType="none"></TextField>
      <TextField hint="Password" secure="true"></TextField>

      <Button [text]="isLoggingIn ? 'Sign in' : 'Sign up'" class="submit-button" (tap)="submit()"></Button>
      <Button [text]="isLoggingIn ? 'Sign up for Groceries' : 'Back to login'" (tap)="toggleDisplay()"></Button>
    </StackLayout>
  `,
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {

  email = "nativescripthook@telerik.com";
  isLoggingIn = true;

  submit(){
    alert("You're using: " + this.email);
    console.log(`hello ${new Date()}`);
  }
  toggleDisplay(){
    this.isLoggingIn = !this.isLoggingIn;

  }
 }