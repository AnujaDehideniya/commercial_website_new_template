import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-done-dialog',
  templateUrl: './done-dialog.component.html',
  styleUrl: './done-dialog.component.scss'
})
export class DoneDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.dialogRef.close();
    // }, 2000);
   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
