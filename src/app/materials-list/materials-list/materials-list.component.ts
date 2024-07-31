import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CommonMaterial, RareMaterial} from "../../shared/enums/enums";
import {Observable, take} from "rxjs";
import {PriceEntry, PriceHistoryState} from "../../store/price-history.reducer";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/price-history.actions";

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
  @Output() itemSelected = new EventEmitter<any>();
  priceHistory$: Observable<PriceHistoryState>;

  public rareIsActive: boolean = false;
  public commonIsActive: boolean = false;

  public commonMaterialsData = [
    { src: './assets/images/common-materials/Bolt_of_Cloth.png', name: 'Bolt of Cloth', id: `${CommonMaterial.BOLT_OF_CLOTH}` },
    { src: './assets/images/common-materials/Bone.png', name: 'Bone', id: `${CommonMaterial.BONES}` },
    { src: './assets/images/common-materials/Chitin_Fragment.png', name: 'Chitin Fragment', id: `${CommonMaterial.CHITIN_FRAGMENT}` },
    { src: './assets/images/common-materials/Feather.png', name: 'Feather', id: `${CommonMaterial.FEATHERS}` },
    { src: './assets/images/common-materials/Granite_Slab.png', name: 'Granite Slab', id: `${CommonMaterial.GRANITE_SLAB}` },
    { src: './assets/images/common-materials/Iron_Ingot.png', name: 'Iron Ingot', id: `${CommonMaterial.IRON_IGNOT}` },
    // TODO Create enum for pile of glittering
    { src: './assets/images/common-materials/Pile_of_Glittering_Dust.png', name: 'Pile of Glittering Dust', id: `${CommonMaterial.IRON_IGNOT}` },
    { src: './assets/images/common-materials/Plant_Fiber.png', name: 'Plant Fiber', id: `${CommonMaterial.PLANT_FIBRES}` },
    { src: './assets/images/common-materials/Scale.png', name: 'Scale', id: `${CommonMaterial.SCALE}` },
    { src: './assets/images/common-materials/Tanned_Hide_Square.png', name: 'Tanned Hide Square', id: `${CommonMaterial.TANNED_HIDE_SQUARE}` },
    { src: './assets/images/common-materials/Wood_Plank.png', name: 'Wood Plank', id: `${CommonMaterial.WOOD_PLANK}` }
  ];
  public rareMaterialsData = [
    { src: './assets/images/rare-materials/Amber_Chunk.png', name: 'Amber Chunk', id: `${RareMaterial.AMBER_CHUNK}` },
    { src: './assets/images/rare-materials/Bolt_of_Damask.png', name: 'Bolt of Damask', id: `${RareMaterial.BOLT_OF_DAMASK}` },
    { src: './assets/images/rare-materials/Bolt_of_Linen.png', name: 'Bolt of Linen', id: `${RareMaterial.BOLT_OF_LINEN}` },
    { src: './assets/images/rare-materials/Bolt_of_Silk.png', name: 'Bolt of Silk', id: `${RareMaterial.BOLT_OF_SILK}` },
    { src: './assets/images/rare-materials/Deldrimor_Steel_Ingot.png', name: 'Deldrimor Steel Ignot', id: `${RareMaterial.DELDRIMOR_STEEL_INGOT}` },
    { src: './assets/images/rare-materials/Diamond.png', name: 'Diamond', id: `${RareMaterial.DIAMOND}` },
    { src: './assets/images/rare-materials/Elonian_Leather_Square.png', name: 'Elonian Leather Square', id: `${RareMaterial.ELONIAN_LEATHER_SQUARE}` },
    { src: './assets/images/rare-materials/Fur_Square.png', name: 'Fur Square', id: `${RareMaterial.FUR_SQUARE}` },
    { src: './assets/images/rare-materials/Glob_of_Ectoplasm.png', name: 'Glob_of_Ectoplasm', id: `${RareMaterial.GLOB_OF_ECTOPLASM}` },
    { src: './assets/images/rare-materials/Jadeite_Shard.png', name: 'Jadeite Shard', id: `${RareMaterial.JADEITE_SHARD}` },
    { src: './assets/images/rare-materials/Leather_Square.png', name: 'Leather Square', id: `${RareMaterial.LEATHER_SQUARE}` },
    { src: './assets/images/rare-materials/Lump_of_Charcoal.png', name: 'Lump of Charcoal', id: `${RareMaterial.LUMP_OF_CHARCOAL}` },
    { src: './assets/images/rare-materials/Monstrous_Claw.png', name: 'Monstrous Claw', id: `${RareMaterial.MONSTROUS_CLAW}` },
    { src: './assets/images/rare-materials/Monstrous_Eye.png', name: 'Monstrous Eye', id: `${RareMaterial.MONSTROUS_EYE}` },
    { src: './assets/images/rare-materials/Monstrous_Fang.png', name: 'Monstrous Fang', id: `${RareMaterial.MONSTROUS_FANG}` },
    { src: './assets/images/rare-materials/Obsidian_Shard.png', name: 'Obsidian Shard', id: `${RareMaterial.OBISIDAN_SHARD}` },
    { src: './assets/images/rare-materials/Onyx_Gemstone.png', name: 'Onyx Gemstone', id: `${RareMaterial.ONYX_GEMSTONE}` },
    { src: './assets/images/rare-materials/Roll_of_Parchment.png', name: 'Roll of Parchment', id: `${RareMaterial.ROLL_OF_PARCHMENT}` },
    { src: './assets/images/rare-materials/Roll_of_Vellum.png', name: 'Roll of Vellum', id: `${RareMaterial.ROLL_OF_VELLUM}` },
    { src: './assets/images/rare-materials/Ruby.png', name: 'Ruby', id: `${RareMaterial.RUBY}` },
    { src: './assets/images/rare-materials/Sapphire.png', name: 'Sapphire', id: `${RareMaterial.SAPPHIRE}` },
    { src: './assets/images/rare-materials/Spiritwood_Plank.png', name: 'Spiritwood Plank', id: `${RareMaterial.SPIRITWOOD_PLANK}` },
    { src: './assets/images/rare-materials/Steel_Ingot.png', name: 'Steel Ignot', id: `${RareMaterial.STEEL_INGOT}` },
    { src: './assets/images/rare-materials/Tempered_Glass_Vial.png', name: 'Tempered Glass Vial', id: `${RareMaterial.TEMPERED_GLASS_VIAL}` },
    { src: './assets/images/rare-materials/Vial_of_Ink.png', name: 'Vial of Ink', id: `${RareMaterial.VIAL_OF_INK}` }
  ];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.priceHistory$ = this.store.pipe(select('priceHistory'));
  }
  public commonMaterialActive(): void {
    if (!this.commonIsActive) {
      this.commonIsActive = true;
    }
    this.rareIsActive = false;
    this.cdr.detectChanges()
  }
  public rareMaterialActive(): void {
    if (!this.rareIsActive) {
      this.rareIsActive = true;
    }

    this.commonIsActive = false;
    this.cdr.detectChanges()

  }
  onImageClick(item: {name: string, id: string}) {
    this.itemSelected.emit(item);
  }
}
