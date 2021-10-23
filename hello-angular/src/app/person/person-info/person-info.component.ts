import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/domain/person';
import { PersonService } from 'src/app/person/person.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  formPerson : FormGroup = this.fb.group({
    id: ['', []],
    name: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
  })

  loading: boolean = false;
  paramId: string | any;

  constructor(private router: ActivatedRoute,
    private fb: FormBuilder, 
    private personService: PersonService,
    private route: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      this.paramId = param.get("id");
      this.loading = true;
      if (this.paramId != null) {
        let id = parseInt(this.paramId);
        this.personService.findOne(id).subscribe(p => {
          this.buildForm(p);
          this.loading = false;
        }, error => {
          this.loading = false;
          this.snackBar.open(error, "Error", {duration: 2000});
          this.goToBack();
        })
      } else {
        this.loading = false;
      }
    })
  }

  buildForm(person: Person | null) {
    if (person != null) {
      this.formPerson.patchValue({
        id: person.id,
        name: person.firstName,
        lastName: person.lastName,
        age: person.age,
      })
    }
  }

  get fc() {
    return this.formPerson.controls;
  }

  goToBack() {
    this.route.navigate(['persons', 'list']);
  }

  save() {
    const person = new Person(
      this.formPerson.get(["id"])?.value,
      this.formPerson.get(["name"])?.value,
      this.formPerson.get(["lastName"])?.value,
      +this.formPerson.get(["age"])?.value);

    if (this.paramId == null) {
      this.createPerson(person);
    } else {
      this.updatePerson(person);
    }
  }
  
  private createPerson(person: Person) {
    this.personService.create(person).subscribe(p => {
      this.snackBar.open("La persona se creó con éxito", "Éxito", {duration: 2000});
      this.goToBack();
    },
    error => {
      this.snackBar.open(error, "Error", {duration: 2000});
      console.log(error)
    }
  )
  }

  private updatePerson(person: Person) {
    this.personService.update(person).subscribe(p => {
      this.snackBar.open("La persona se actualizó con éxito", "Éxito", {duration: 2000});
      this.goToBack();
    },
    error => {
      this.snackBar.open(error, "Error", {duration: 2000});
    }
  )
  }
}