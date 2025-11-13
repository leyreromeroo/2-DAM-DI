import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstContactos } from './lst-contactos';

describe('LstContactos', () => {
  let component: LstContactos;
  let fixture: ComponentFixture<LstContactos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LstContactos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LstContactos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
