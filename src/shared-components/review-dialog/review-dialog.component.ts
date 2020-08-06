import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerValidationFormService} from '../../shared/services/server-validation-form.service';
import {User} from '../../shared/models/user/user.class';
import {UserService} from '../../shared/services/components/user/user.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {MessageService} from '../../shared/services/components/message/message.service';
import {LogNotificationService} from '../../shared/services/log-notification.service';

@Component({
  selector: 'review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialog implements OnInit {
  public reviewForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _messageService: MessageService,
    private _logNotificationService: LogNotificationService,
    private _authService: AuthService,
    public serverValidationForm: ServerValidationFormService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.createForm();
  }
  getUserData(): void {
    if (this._authService.getToken()) {
      this._userService.view().subscribe((res: User) => {
        this.reviewForm.patchValue(res);
      });
    }
  }
  createForm(): void {
    this.reviewForm = this._fb.group({
      name: ['', [Validators.required, Validators.max(20)]],
      email: ['', [Validators.email, Validators.required, Validators.max(50)]],
      message: ['', [Validators.required, Validators.max(255)]],
    });
  }
  isRequestComplete(): boolean {
    return this._messageService.getRequestStatus();
  }
  sendReview():void {
    this._messageService.setRequestStatus(false);
    this._messageService.sendMessage(this.reviewForm.value).subscribe(
      (res: string) => {
        this._messageService.setRequestStatus(true);

        this._logNotificationService.success('Message has been successfully sanded', 2000, true);
      },
      (err) => {
        this._messageService.setRequestStatus(true);
        this._logNotificationService.error(err.error, 3000, true);
        if (err.status === 422) {
          this.serverValidationForm.showErrors(err.error.errors, this.reviewForm.controls);
        }
      }
    );
  }
}
