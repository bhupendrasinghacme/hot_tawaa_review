import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {
  bookingForm: FormGroup;
  sub: any;
  review_star: any;
  service_star: any;
  id: any;
  private itemDoc: AngularFirestoreCollection<any>;
  isSubmitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    public fb: FormBuilder
  ) {
    this.sub = this.route.paramMap.subscribe(params => {
      this.review_star = params.get("review") || 0;
      this.service_star = params.get('service') || 0;
    });
  }

  ngOnInit() {
    this.itemDoc = this.db.collection<any>('user_review_data', ref => ref.orderBy('createdAt'));
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get errorControl() {
    return this.bookingForm.controls;
  }
  submitUserReview() {
    this.isSubmitted = true;
    if (!this.bookingForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }
    this.bookingForm.value['rewiew_star'] = this.review_star;
    this.bookingForm.value['service_star'] = this.service_star;

    if (this.bookingForm.value.name != "" && this.bookingForm.value.email != "" && this.bookingForm.value.phone != "") {
      let data = this.bookingForm.value;
      let check_data = this.db.collection('user_review_data').ref.where('email', '==', this.bookingForm.value.email).get();
      check_data.then((ref) => {

        this.id = ref.docs.map(doc => doc.id);
        let results = ref.docs.map(doc => doc.data());
        if (results.length > 0) {
          // console.log(this.db.collection('user_review_data'));
          // this.db.collection('user_review_data').doc(this.id).update(data)
          // .then(() => {
          this.router.navigate(['/thankyou']);
          // }).catch(error => console.log(error));
        }
        else {
          this.itemDoc.add(data).then(itm => {
            this.router.navigate(['/thankyou']);
          });
        }
      });
    }
  }

}
