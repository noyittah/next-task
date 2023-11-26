import { Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../../components/movies/movie-details/movie-details.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService implements OnInit{
  isIPhoneX: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isIPhoneX = this.checkIfIPhoneX();
  }

  openModal(movieId: number) {
    const dialogRef: MatDialogRef<MovieDetailsComponent> = this.dialog.open(MovieDetailsComponent, {
      width: this.isIPhoneX ? '294px' : '1360px',
      height: this.isIPhoneX ? '671px' : '690px',
      data: { movieId }
    });

    const modalInstance = dialogRef.componentInstance;
    modalInstance.closeModalEvent.subscribe(() => {
      dialogRef.close();
    });
  }

  private checkIfIPhoneX(): boolean {
    const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isIPhoneXSize = window.innerWidth === 375 && window.innerHeight === 812;
    return isIOS && isIPhoneXSize;
  }
}
