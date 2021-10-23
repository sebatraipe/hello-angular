import { Model } from "./model";

export class Bus {
    id: number;
    licensePlate: string;
    model: Model; 
    numberOfSeats: number;

    constructor (id: number, licensePlate: string, model: Model, numberOfSeats: number) {
        this.id = id;
        this.licensePlate = licensePlate;
        this.model = model;
        this.numberOfSeats = numberOfSeats;
    }

    public validatedSeats(passenger: number) {
        if (passenger <= this.numberOfSeats) 
            return true;
        throw 'Supera la cantidad máxima de pasajeros.';
    }
}