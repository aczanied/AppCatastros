import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrediosComponent } from './predios.component';

describe('PrediosComponent', () => {
  let component: PrediosComponent;
  let fixture: ComponentFixture<PrediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
