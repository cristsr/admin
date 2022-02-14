import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { MatDialog } from '@angular/material/dialog';
import { MovementDetailComponent } from './detail/movement-detail.component';
import { ActivatedRoute } from '@angular/router';

const { Camera } = Plugins;

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  expenseView: string;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(console.log);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MovementDetailComponent, {
      data: {
        hello: 'world',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.data2 = {
      hello: 'world',
    };
  }

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.webPath;
    // Can be set to the src of an image now

    const imageEl: any = document.getElementById('image');
    imageEl.src = imageUrl;
  }

  addMovement(): void {
    window.alert('new movement');
  }
}
