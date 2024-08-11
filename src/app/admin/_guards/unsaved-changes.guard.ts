import { CanDeactivateFn } from '@angular/router';
import { AddPostComponent } from '../_components/add-post/add-post.component';
import { DynamicDialogService } from '../../shared/dynamic-dialog/dynamic-dialog.service';
import { inject } from '@angular/core';
import { ModalStatusEnum } from '../../shared/_models/modal-status.interface';
import { map, of } from 'rxjs';

export const unsavedChangesGuard: CanDeactivateFn<AddPostComponent> = (component: AddPostComponent) => {
  const dynamicDialogService = inject(DynamicDialogService);
  if (component.blogForm.dirty) {
    return dynamicDialogService
      .openDialog(component.viewContainerRef,
        {
          primaryButton: 'Yes',
          secondaryButton: 'No',
          title: 'You have unsaved changes',
          content: 'Are you sure you want to leave this page?',
        })
      .pipe(
        map((status) => {
          if (status === ModalStatusEnum.ACCEPTED) {
            return true;
          } else {
            return false;
          }
        })
      );
  } else {
    return of(true);
  }
};

