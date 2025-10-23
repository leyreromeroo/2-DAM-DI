import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPersonal } from './foto-personal';

describe('FotoPersonal', () => {
  let component: FotoPersonal;
  let fixture: ComponentFixture<FotoPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoPersonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
