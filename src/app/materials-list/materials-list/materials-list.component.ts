import { Component, EventEmitter, Output } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CommonMaterial, MaterialType, RareMaterial} from "../../shared/enums/enums";
import {commonMaterialsImages, rareMaterialsImages} from "./helper/materials-image-data";


@Component({
  selector: 'app-materials-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.css'
})
export class MaterialsListComponent {
  @Output() itemSelected = new EventEmitter<{name: string, id: string}>();
  public readonly commonMaterialsData = commonMaterialsImages;
  public readonly rareMaterialsData = rareMaterialsImages;

  public activePanel: MaterialType | '' = '';
  public MaterialType = MaterialType;
  constructor() {}

  public toggleMaterialPanel(type: MaterialType): void {
    this.activePanel = this.activePanel === type ? '' : type;
  }

  emitItemData(item: {name: string, id: string}) {
    this.itemSelected.emit(item);
  }
}
