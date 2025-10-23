import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReceta } from './nueva-receta';

describe('NuevaReceta', () => {
  let component: NuevaReceta;
  let fixture: ComponentFixture<NuevaReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaReceta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaReceta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
