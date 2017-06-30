import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { TextField } from "ui/text-field";

import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "list",
    templateUrl: "pages/list/list.html",
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [GroceryListService]
})
export class ListComponent implements OnInit {
    groceryList: Array<Grocery> = [];
    grocery = "";
    isLoading = false;
    listLoaded = false;
    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService) { }

    ngOnInit() {
        this.isLoading = true;
        setTimeout(() => { //simulate x seconds of server latency
            this.groceryListService.load()
                .subscribe(loadedGroceries => {
                    loadedGroceries.forEach((groceryObject) => {
                        this.groceryList.unshift(groceryObject);
                    });
                    this.isLoading = false;
                    this.listLoaded = true;
                });
        }, 3000);
    }

    add() {
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
            groceryObject => {
                this.groceryList.unshift(groceryObject);
                this.grocery = "";
            },
            () => {
                alert({
                    message: "An error occurred while adding an itme to your list.",
                    okButtonText: "OK"
                });
                this.grocery = "";
            }
            )
    }

    share() {
        let listString = this.groceryList
            .map(grocery => grocery.name)
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    }
}