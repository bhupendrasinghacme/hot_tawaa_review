import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})

export class ReviewsPage implements OnInit {
  COLORS: any = {
    GREY: "#E0E0E0",
    GREEN: "#76FF03",
    YELLOW: "#FFCA28",
    RED: "#DD2C00"
  }

  rating: any;
  rating2: any;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  rate(index: number, type: String) {
    if (type == "review") {
      this.rating = index;
    } else {
      this.rating2 = index;
    }

    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  isAboveRating2(index: number): boolean {
    return index > this.rating2;
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return this.COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return this.COLORS.RED;
      case 3:
        return this.COLORS.YELLOW;
      case 4:
      case 5:
        return this.COLORS.GREEN;
      default:
        return this.COLORS.GREY;
    }
  }

  getColor2(index: number) {
    if (this.isAboveRating2(index)) {
      return this.COLORS.GREY;
    }
    switch (this.rating2) {
      case 1:
      case 2:
        return this.COLORS.RED;
      case 3:
        return this.COLORS.YELLOW;
      case 4:
      case 5:
        return this.COLORS.GREEN;
      default:
        return this.COLORS.GREY;
    }
  }

  // submitReview() {
  //   if (this.rating > 0 && this.rating2 > 0) {
  //     this.router.navigate(['/user-form'], { queryParams: { review: this.rating, service: this.rating2 } });
  //   }
  // }

}
