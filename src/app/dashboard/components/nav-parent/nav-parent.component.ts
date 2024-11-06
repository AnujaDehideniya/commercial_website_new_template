import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../common/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { DeviceDetectionService } from '../../../common/service/device-detection.service';
interface Node {
  icon?: string,
  name: string,
  route?: string,
  children?: Node[];
  single?: boolean
}

const TREE_DATA: Node[] = [
  {
    icon: 'group',
    name: 'Today Session',
    route: 'dashboard/session/today_session',

  },
  {
    icon: 'settings',
    name: 'Make Appointment',
    route: 'dashboard/appointment/make-appoinment',

  },

  {
    icon: 'calendar_month',
    name: 'Manage Session',
    route: 'dashboard/session/manage_session',

  },
  {
    icon: 'settings',
    name: 'Reports',
    route: 'dashboard/reports',

  },
  {
    icon: 'receipt_long',
    name: 'Kiosk',
    route: 'kiosk',


  }

];
@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrl: './nav-parent.component.scss'
})
export class NavParentComponent {
  private unsubscribe$ = new Subject<void>();
  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  @Output() toggle = new EventEmitter<any>();
  constructor(private router: Router,private devicedetect:DeviceDetectionService, public dialog: MatDialog,private _auth_service: AuthService) {
    this.dataSource.data = TREE_DATA;
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {


        this.changeNav(val.url)
      }
    });
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;



  nodeExpand(node: any) {

    var parent = this.getParent(node);

    if (parent == -1) {
      this.treeControl.collapseAll();
      this.treeControl.expand(node);
     if(node.name=="Logout"){
      this.logout()
     }

    } else {
      if (!parent) {
        this.treeControl.collapseAll();
        this.treeControl.expand(node);
        if(TREE_DATA[TREE_DATA.length-1]==node){

          var data = {
            title: " Change to kiosk mode ?",
            text: " Are you sure want to move to kiosk mode ?",
            msg_type: "",
            msg: "",
            positive_button: "YES",
            negative_button: "CANCEL",
          }
          var ALL_DATA={
            width: '30%',
            data: data,
          }
          if(this.devicedetect.isMobileDevice()){
            ALL_DATA.width='95vw';
          }

          const dialogRef = this.dialog.open(ConfirmationDialogComponent,
            ALL_DATA);
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              //after confermation
              this.router.navigate([node.route]);
            }else{
              this.treeControl.collapseAll();

            }

          });
        }else{
          this.router.navigate([node.route]);
          if (node.children?.length>0){
            this.treeControl.expand(node.children[0]);
          }
        }


      } else {

        var children = parent.children;
        if (children)
          for (let index = 0; index < children.length; index++) {
            const element = children[index];
            this.treeControl.collapse(element);
          }
        this.treeControl.expand(parent);
        this.treeControl.expand(node);

        this.router.navigate([node.route]);
      }
    }
  }
  nodeCollapse(node: any) {
    if (node.children) {
      this.treeControl.collapseAll();
    } else {
      this.treeControl.expand(node);
    }
  }

  getParent(node: Node): any {
    for (let index = 0; index < TREE_DATA.length; index++) {
      const element = TREE_DATA[index];
      if (element.children?.includes(node)) {
        return element;
      }
    }
    if (node.single) {
      return -1;
    } else {
      return null;
    }

  }

  findNodeByRoute(tree: Node[], targetRoute: string): Node | undefined {
    for (const node of tree) {
      if (node.route === targetRoute) {
        return node;
      }

      if (node.children) {
        const childResult = this.findNodeByRoute(node.children, targetRoute);
        if (childResult) {
          return childResult;
        }
      }
    }

    return undefined;
  }
  removeLeadingSlash(route: string): string {
    return route.replace(/^\//, '');
  }
  changeNav(targetRoute: string) {
    this.toggle.emit();
    targetRoute = this.removeLeadingSlash(targetRoute);
    const foundNode = this.findNodeByRoute(TREE_DATA, targetRoute);

    if (foundNode) {

      this.nodeExpand(foundNode)
    }
  }

logout(){

  var data = {
    title: "Log out",
    text: "Are you sure  you want to logout from the system?",
    msg_type: "",
    msg: "",
    positive_button: "YES",
    negative_button: "CANCEL",
  }
  const dialogRef = this.dialog.open(ConfirmationDialogComponent
    , {
    width: '25vw',
    data: data,
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this._auth_service.logOut();
      this.router.navigate(['auth/login']);
    }else{

    }

  });
}
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
