import { Component, OnInit } from '@angular/core';
import { Movement } from '../../../../core/interfaces/Movement';

import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  data: Movement[] = [
    {
      date: '11-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 130000
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'rest',
      quantity: 120000
    },
    {
      date: '10-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 8000
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 4000
    },
    {
      date: '9-05-2021',
      category: {
        icon: 'favorite',
        color: 'red',
        name: 'Medico'
      },
      description: 'test',
      quantity: 120000
    },
  ];

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



