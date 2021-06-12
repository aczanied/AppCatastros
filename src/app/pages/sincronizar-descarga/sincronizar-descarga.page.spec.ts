import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SincronizarDescargaPage } from './sincronizar-descarga.page';

describe('SincronizarDescargaPage', () => {
  let component: SincronizarDescargaPage;
  let fixture: ComponentFixture<SincronizarDescargaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizarDescargaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SincronizarDescargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
