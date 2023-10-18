import { Component } from '@angular/core';
import { EncryptionService } from './service/encryption.service';
import { DecryptedObject } from './models/DecryptedObject';
import { EncryptedObject } from './models/EncryptedObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NeoFacto Symmetric Encryption';

  resultEncryption = '';

  resultDecryption = '';

  decryptedObject: DecryptedObject = new DecryptedObject;
  encryptedObject: EncryptedObject = new EncryptedObject;

  constructor(private encryptionService: EncryptionService){}

  encrypt(event: any) {
    this.decryptedObject = {
      decryptedText: event.textValue,
      passPhrase: event.passPhraseValue,
      algorithm: event.algorithmValue
    };
    this.encryptionService.encryptValue(this.decryptedObject).subscribe(data => {
      this.resultEncryption = data.encryptedText;
    }, err => {
      window.alert(err.error)
    });
  }

  decrypt(event: any) {
    this.encryptedObject = {
      encryptedText: event.textValue,
      passPhrase: event.passPhraseValue,
      algorithm: event.algorithmValue
    };
    this.encryptionService.decryptValue(this.encryptedObject).subscribe(data => {
      this.resultDecryption = data.decryptedText;
    }, err => {
      window.alert(err.error)
    });
  }
}
