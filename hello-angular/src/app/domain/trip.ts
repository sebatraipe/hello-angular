import { Bus } from "./bus";
import { Person } from "./person";

export class Trip {
    id: number;
    departure: string;
    destination: string;
    bus: Bus;
    passengers: Person[]; 
    startDate: number;
    endDate: number;

    constructor (id: number, departure: string, destination: string, bus: Bus, passengers: Person[], startDate: number, endDate: number) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
        this.bus = bus;
        this.passengers = passengers;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public destinationDateAndTime() {
        return this.endDate * 1000;
    }

    public departureDateAndTime() {
        return this.startDate * 1000;
    }
}