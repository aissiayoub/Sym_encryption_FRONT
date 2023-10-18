import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EncryptionService } from './service/encryption.service';
import { of, throwError } from 'rxjs';
import { EncryptionFormComponent } from './component/encryption-form/encryption-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EncryptedObject } from './models/EncryptedObject';
import { DecryptedObject } from './models/DecryptedObject';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let encryptionService: jasmine.SpyObj<EncryptionService>;

  beforeEach(() => {
    const encryptionServiceSpy = jasmine.createSpyObj('EncryptionService', ['encryptValue', 'decryptValue']);

    TestBed.configureTestingModule({
      declarations: [AppComponent, EncryptionFormComponent],
      providers: [{ provide: EncryptionService, useValue: encryptionServiceSpy }],
      imports: [
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    encryptionService = TestBed.inject(EncryptionService) as jasmine.SpyObj<EncryptionService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should encrypt data', () => {
    const event = {
      textValue: 'Sample text',
      passPhraseValue: 'MyPassphrase',
      algorithmValue: 'AES'
    };
    const encryptedText = 'Encrypted text';
    const encryptedObject = new EncryptedObject;
    encryptedObject.encryptedText = encryptedText;
    encryptionService.encryptValue.and.returnValue(of(encryptedObject));

    component.encrypt(event);

    expect(component.resultEncryption).toEqual(encryptedText);
    expect(encryptionService.encryptValue).toHaveBeenCalledWith({
      decryptedText: event.textValue,
      passPhrase: event.passPhraseValue,
      algorithm: event.algorithmValue
    });
  });

  it('should decrypt data', () => {
    const encryptedText = '8dvJbyQHKf0rd8ToczrlK6boMlazAZU3FYCazA3Var17y9+JeDrSzQig5/uaMJGB';
    const passPhrase = 'MyPassphrase';
    const algorithm = 'AES';

    const event = {
      textValue: encryptedText,
      passPhraseValue: passPhrase,
      algorithmValue: algorithm
    };

    const decryptedText = 'decrypted text';
    const decryptedObject = new DecryptedObject;
    decryptedObject.decryptedText = decryptedText;
    encryptionService.decryptValue.and.returnValue(of(decryptedObject));

    component.decrypt(event);

    expect(encryptionService.decryptValue).toHaveBeenCalledWith({
      encryptedText,
      passPhrase,
      algorithm
    });
    expect(component.resultDecryption).toBe(decryptedText);
  });

  it('should show an alert on decryption error', () => {
    const event = {
      textValue: 'encrypted text',
      passPhraseValue: 'passphrase',
      algorithmValue: 'AES'
    };

    const errorMessage = 'Decryption failed';
    encryptionService.decryptValue.and.returnValue(throwError({ error: errorMessage }));

    spyOn(window, 'alert');

    component.decrypt(event);

    expect(encryptionService.decryptValue).toHaveBeenCalledWith({
      encryptedText: event.textValue,
      passPhrase: event.passPhraseValue,
      algorithm: event.algorithmValue
    });
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

  it('should show an alert on encryption error', () => {
    const event = {
      textValue: 'decrypted text',
      passPhraseValue: 'passphrase',
      algorithmValue: 'AES'
    };

    const errorMessage = 'Encryption failed';
    encryptionService.encryptValue.and.returnValue(throwError({ error: errorMessage }));

    spyOn(window, 'alert');

    component.encrypt(event);

    expect(encryptionService.encryptValue).toHaveBeenCalledWith({
      decryptedText: event.textValue,
      passPhrase: event.passPhraseValue,
      algorithm: event.algorithmValue
    });
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

});
