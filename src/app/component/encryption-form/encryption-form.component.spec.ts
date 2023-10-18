import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncryptionFormComponent } from './encryption-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('EncryptionFormComponent', () => {
  let component: EncryptionFormComponent;
  let fixture: ComponentFixture<EncryptionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncryptionFormComponent],
      providers: [FormBuilder],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(EncryptionFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on button click', () => {
    const sampleData = {
      textValue: 'Sample text',
      passPhraseValue: 'MyPassphrase',
      algorithmValue: 'AES'
    };

    spyOn(component.btnEvent, 'emit');

    component.formData.setValue(sampleData);
    component.btnClick();

    expect(component.btnEvent.emit).toHaveBeenCalledWith(sampleData);
  });
});
