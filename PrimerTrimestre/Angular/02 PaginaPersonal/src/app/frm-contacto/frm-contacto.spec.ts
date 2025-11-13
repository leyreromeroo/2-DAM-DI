import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmContacto } from './frm-contacto';

describe('FrmContacto', () => {
  let component: FrmContacto;
  let fixture: ComponentFixture<FrmContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
