import { TestBed } from '@angular/core/testing';

import { ServicioRecetas } from './servicio-recetas';

describe('ContactService', () => {
  let service: ServicioRecetas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRecetas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
