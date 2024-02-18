import {Component, Input} from '@angular/core';
import {Announce} from "../announce.model";
import {AnnounceService} from "../announce.service";
import {SharedDataService} from "../../../services/shared-data.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../services/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-announce-card',
  templateUrl: './announce-card.component.html',
  styleUrls: ['./announce-card.component.css']
})
export class AnnounceCardComponent {
  @Input() announce!: Announce;
  @Input() showActions: boolean = false;
  @Input() isLinkedToPurchase: boolean = false;

  constructor(private announceService: AnnounceService,
              private sharedDataService: SharedDataService,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  onSelectAnnounce(announce: Announce): void {
    this.sharedDataService.selectedAnnounce = announce;
    this.router.navigate(['/create-purchase']);
  }

  viewPurchases(announceId: number | undefined): void {
    this.router.navigate(['/purchases', { announceId: announceId }]);
  }

  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message: 'Êtes-vous sûr de vouloir supprimer cette annonce ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAnnounce();
      }
    });
  }

  deleteAnnounce(): void {
    if (this.announce.id) {
      this.announceService.deleteAnnounce(this.announce.id).subscribe(
        () => {
          this.sharedDataService.announceDeleted(this.announce.id);
          this.snackBar.open('Annonce supprimée avec succès', 'Fermer', {
            duration: 3000
          });
        },
        error => {
          console.error('Erreur lors de la suppression de l\'annonce:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'annonce', 'Fermer', {
            duration: 3000
          });
        }
      );
    }
  }
  editAnnounce(announce: Announce): void {
    this.sharedDataService.selectedAnnounce = announce;
    this.router.navigate(['/edit-announce', {announce}]);
  }


}
