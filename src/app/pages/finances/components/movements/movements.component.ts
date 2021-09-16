import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;


@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  // template:  `
  //   <div class="container">
  //     <div appFlex column class="xs-12">
  //       <app-tabset>
  //         <app-tab tabTitle="Movimientos" active>
  //           <app-movements-list></app-movements-list>
  //         </app-tab>
  //         <app-tab tabTitle="Agregar">
  //           <app-add-movement></app-add-movement>
  //         </app-tab>
  //       </app-tabset>
  //     </div>
  //   </div>
  // `,
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
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



