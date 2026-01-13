import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor() { }

    async getCurrentPosition(): Promise<Position> {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
    }

    async checkPermissions(): Promise<boolean> {
        try {
            const permission = await Geolocation.checkPermissions();
            if (permission.location === 'granted') {
                return true;
            }
            const request = await Geolocation.requestPermissions();
            return request.location === 'granted';
        } catch (e) {
            // On web, requestPermissions might not be implemented
            // Geolocation.getCurrentPosition will trigger the browser prompt anyway
            return true;
        }
    }
}
