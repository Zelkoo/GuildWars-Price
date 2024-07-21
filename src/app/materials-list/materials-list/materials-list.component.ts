import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-materials-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.css'
})
export class MaterialsListComponent {
  @Output() itemSelected = new EventEmitter<string>();

  public rareIsActive: boolean = false;
  public commonIsActive: boolean = false;
  public commonMaterialsImages = [
    { src: './assets/images/common-materials/Bolt_of_Cloth.png', name: 'Bolt of Cloth' },
    { src: './assets/images/common-materials/Bone.png', name: 'Bone' },
    { src: './assets/images/common-materials/Chitin_Fragment.png', name: 'Chitin Fragment' },
    { src: './assets/images/common-materials/Feather.png', name: 'Feather' },
    { src: './assets/images/common-materials/Granite_Slab.png', name: 'Granite Slab' },
    { src: './assets/images/common-materials/Iron_Ingot.png', name: 'Iron Ingot' },
    { src: './assets/images/common-materials/Pile_of_Glittering_Dust.png', name: 'Pile of Glittering Dust' },
    { src: './assets/images/common-materials/Plant_Fiber.png', name: 'Plant Fiber' },
    { src: './assets/images/common-materials/Scale.png', name: 'Scale' },
    { src: './assets/images/common-materials/Tanned_Hide_Square.png', name: 'Tanned Hide Square' },
    { src: './assets/images/common-materials/Wood_Plank.png', name: 'Wood Plank' }
  ];

  public commonMaterialActive(): void {
    if (!this.commonIsActive) {
      this.commonIsActive = true;
    }
    this.rareIsActive = false;
  }
  public rareMaterialActive(): void {
    if (!this.rareIsActive) {
      this.rareIsActive = true;
    }
    this.commonIsActive = false;
  }
  onImageClick(name: string) {
    this.itemSelected.emit(name);
  }
}
