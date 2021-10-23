import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/brand-service/brand.service';
import { Brand } from 'src/app/domain/brand';
import { Bus } from 'src/app/domain/bus';
import { Model } from 'src/app/domain/model';
import { ModelService } from 'src/app/model-service/model.service';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  styleUrls: ['./bus-info.component.css']
})
export class BusInfoComponent implements OnInit {

  formBus: FormGroup = this.fb.group({
    id: ['', []],
    licensePlate: ['', [Validators.required, Validators.required]],
    numberOfSeats: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]]
  })

  loading: boolean = false;
  brands: Brand[] = [];
  models: Model[] = [];
  paramId: string | any;

  constructor(private fb: FormBuilder,
              private busService: BusService,
              private brandService: BrandService,
              private modelService: ModelService,
              private router: ActivatedRoute,
              private route: Router,
              private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      this.paramId = param.get("id");
      this.loading = true;
      this.brandService.findAll().subscribe(list => {
        this.brands = list;
      });
      if (this.paramId != null) {
        let id = parseInt(this.paramId);
        this.busService.findOne(id).subscribe(b => {
          this.buildForm(b);
          this.loading = false;
        }, error => {
          this.loading = false;
          this.snackBar.open(error, "Error", { duration: 2000 });
          this.goToBack();
        })
      } else {
        this.loading = false;
      }
    })
  }

  buildForm(bus: Bus | null) {
    if (bus != null) {
      this.onSelect(bus.model.brand.id);
      this.formBus.patchValue({
        id: bus.id,
        licensePlate: bus.licensePlate,
        numberOfSeats: bus.numberOfSeats,
        brand: bus.model.brand.name,
        model: bus.model.name
      });
    }
  }

  goToBack() {
    this.route.navigate(['buses', 'list']);
  }

  get fc() {
    return this.formBus.controls;
  }

  save() {
    let model: Model;
    let m: Model | any = this.models.find(m => m.name == this.formBus.get(["model"])?.value);
    model = new Model(m.id, m.name, m.brand);

    const bus = new Bus(this.formBus.get(["id"])?.value, 
      this.formBus.get(["licensePlate"])?.value, 
      model, 
      this.formBus.get(["numberOfSeats"])?.value);

    if (this.paramId == null){
      //CREATE BUS
      this.createBus(bus);
    } else {
      //UPDATE BUS
      this.updateBus(bus);
    }
  }

  private createBus(bus: Bus) {
    this.busService.create(bus).subscribe(b => {
      this.snackBar.open("El colectivo se creó con éxito.", "Éxito", {duration: 2000});
      this.goToBack();
    }, error => {
      this.snackBar.open(error, "Error", {duration: 2000});
    })
  }

  private updateBus(bus: Bus) {
    this.busService.update(bus).subscribe(b => {
      this.snackBar.open("El colectivo se actualizó con éxito.", "Éxito", {duration: 2000});
      this.goToBack();
    }, error => {
      this.snackBar.open(error, "Error", {duration: 2000});
    })
  }

  onSelect(id: number) {
    this.modelService.findAll(id).subscribe(list => {
      this.models = list;
    })
  }
}