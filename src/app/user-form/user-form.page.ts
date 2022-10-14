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
  length_docs: any = 0;
  submit_checker: boolean = true;
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
      name: [''],
      // , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
      email: [''],
      // , [Validators.required, Validators.pattern('^[0-9]+$')]
      mobile: ['']
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // get errorControl() {
  //   return this.bookingForm.controls;
  // }
  submitUserReview() {
    this.submit_checker = false;
    // if (!this.bookingForm.valid) {
    //   return false;
    // }

    this.bookingForm.value['rewiew_star'] = this.review_star != "undefined" ? this.review_star : 0;
    this.bookingForm.value['service_star'] = this.service_star != "undefined" ? this.service_star : 0;

    let data = this.bookingForm.value;
    let check_data = this.db.collection('user_review_data').ref.where('email', '==', this.bookingForm.value.email).get();
    check_data.then(async (ref) => {

      this.id = await ref.docs.map(doc => doc.id);
      let results = await ref.docs.map(doc => doc.data());

      this.db
        .collection("user_review_data")
        .get()
        .subscribe((docs_data) => {

          if (this.bookingForm.value.name == "") {
            this.bookingForm.value.name = `Customer ${docs_data.docs.length + 1}`;
            this.bookingForm.value.email = `Customer ${docs_data.docs.length + 1}@gmail.com`;
          }

          if (this.bookingForm.value.email == "") {
            this.bookingForm.value.email = "";
          }

          if (this.bookingForm.value.phone == "") {
            this.bookingForm.value.phone = "";
          }

          if (results != undefined && results.length > 0) {
            this.db.collection("user_review_data")
              .doc<any>(`${this.id}`)
              .delete()
              .then(() => {
                this.itemDoc.add(data).then(() => {
                  this.submit_checker = true;
                  this.router.navigate(['/thankyou']);
                });

              }).catch(error => {
                this.submit_checker = true;
                console.log(error)
              });
          }
          else {

            this.itemDoc.add(data).then(() => {
              this.submit_checker = true;
              this.router.navigate(['/thankyou']);
            });
          }
        });
    });

  }

}
