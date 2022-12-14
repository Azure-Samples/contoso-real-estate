import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from "@angular/core";

@Directive({
  selector: "[appInfiniteScroll]",
  standalone: true,
})
export class InfiniteScrollingDirective implements OnDestroy {
  @Output() onLoadRequested = new EventEmitter();
  private intersectionThreshold = 0.1;
  private intersectionObserver!: IntersectionObserver;

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    const config = {
      threshold: this.intersectionThreshold,
    };

    this.intersectionObserver = new window.IntersectionObserver(this.onIntersectionCallback.bind(this), config);
    this.intersectionObserver.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }

  private onIntersectionCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.zone.run(() => {
          this.onLoadRequested.emit();
        });
      }
    });
  }
}
