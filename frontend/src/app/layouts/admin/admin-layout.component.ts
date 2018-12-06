import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { MenuItems, Menu } from 'app/shared/menu-items';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { AppService } from 'app/services/app-service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ClientStoreService } from '@app/shared/service/client-storage.service';
import { NotificationService } from '@app/common/notifications/notification-service';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  public static updateUserAvatar: Subject<boolean> = new Subject();
  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  currentLang = 'en';
  options: Options;
  theme = 'light';
  showSettings = false;
  isDocked = false;
  isBoxed = false;
  isOpened = true;
  mode = 'push';
  _mode = this.mode;
  _autoCollapseWidth = 991;
  width = window.innerWidth;
  userAvatar: any = 'assets/images/face-chibi.jpg';
  userFullname: string;
  _menuItems: Menu[];

  @ViewChild('sidebar') sidebar;

  constructor(
    private notificationService: NotificationService,
    private clientStorageService: ClientStoreService,
    public menuItems: MenuItems,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    // private modalService: NgbModal,
    private titleService: Title,

    private appService: AppService,
    private zone: NgZone) {
    const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr|vi/) ? browserLang : 'vi');
    translate.use('en');
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit(): void {
    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      document.querySelector('.main-content').scrollTop = 0;
      this.runOnRouteChange();
    });

    AdminLayoutComponent.updateUserAvatar.subscribe(res => {
      this.getUserAvatar();
    });

    this.getUserAvatar();
    this.getOrgnizationUnit();

    // const userInfo = this.clientStorageService.get('userInfo') as People;
    // if (!!!userInfo) {
    //   this._menuItems = [];
    //   this.translate
    //     .get('COMMON.MESSAGE.UNAUTHORIZED')
    //     .subscribe(message => {
    //       this.notificationService.error(message);
    //     });
    // } else {
    //   this._menuItems = this.menuItems.getAll();
    //   this.userFullname = userInfo.fullName;
    // }
    this._menuItems = this.menuItems.getAll();
  }

  getUserAvatar() {

  }
  orgChange(value) {
    this.appService.CurrentSelectedOrgUnitId = value;
  }
  getOrgnizationUnit() {

  }

  ngAfterViewInit(): void {
    setTimeout(_ => this.runOnRouteChange());
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver() || this.router.url === '/maps/fullscreen') {
      this.isOpened = false;
    }

    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.options = activeRoute.snapshot.data;
    });

    if (this.options) {
      if (this.options.hasOwnProperty('heading')) {
        this.setTitle(this.options.heading);
      }
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle('New Horizons | ' + newTitle);
  }

  toogleSidebar(): void {
    if (this._mode !== 'dock') {
      this.isOpened = !this.isOpened;
    }
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }

  openSearch(search) {
    // this.modalService.open(search, { windowClass: 'search', backdrop: false });
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'basic-webpage-txt',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'menu', name: 'MENU' }
      ]
    });
  }

  logout() {

  }
}
