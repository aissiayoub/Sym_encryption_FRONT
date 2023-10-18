import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EncryptionService } from './encryption.service';
import { DecryptedObject } from '../models/DecryptedObject';
import { EncryptedObject } from '../models/EncryptedObject';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EncryptionService]
    });

    service = TestBed.inject(EncryptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt a value', () => {
    const dummyDecryptedObject: DecryptedObject = {
      decryptedText: 'Sample text',
      passPhrase: 'MyPassphrase',
      algorithm: 'AES'
    };

    const encryptedText = 'Encrypted text';

    service.encryptValue(dummyDecryptedObject).subscribe(data => {
      expect(data.encryptedText).toEqual(encryptedText);
    });

    const req = httpMock.expectOne(service.baseUrl + '/encrypt');
    expect(req.request.method).toBe('POST');
    req.flush({ encryptedText });
  });

  it('should decrypt a value', () => {
    const dummyEncryptedObject: EncryptedObject = {
      encryptedText: 'Encrypted text',
      passPhrase: 'MyPassphrase',
      algorithm: 'AES'
    };

    const decryptedText = 'Decrypted text';

    service.decryptValue(dummyEncryptedObject).subscribe(data => {
      expect(data.decryptedText).toEqual(decryptedText);
    });

    const req = httpMock.expectOne(service.baseUrl + '/decrypt');
    expect(req.request.method).toBe('POST');
    req.flush({ decryptedText });
  });
});
