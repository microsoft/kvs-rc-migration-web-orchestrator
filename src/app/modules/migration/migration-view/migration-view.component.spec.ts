import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationViewComponent } from './migration-view.component';

describe('MigrationViewComponent', () => {
  let component: MigrationViewComponent;
  let fixture: ComponentFixture<MigrationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
