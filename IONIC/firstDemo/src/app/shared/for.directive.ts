import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[for]',
  standalone: true
})
export class ForDirective<T = any> {
  private items: any[] = [];

  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}

  @Input()
  set forOf(collection: T[] | undefined) {
    this.items = collection ?? [];
    this.updateView();
  }

  @Input()
  set forCount(count: number) {
    this.items = Array.from({ length: Math.max(0, count || 0) });
    this.updateView();
  }

  private updateView() {
    this.vcr.clear();
    for (let i = 0; i < this.items.length; i++) {
      this.vcr.createEmbeddedView(this.tpl, { $implicit: this.items[i], index: i });
    }
  }
}
