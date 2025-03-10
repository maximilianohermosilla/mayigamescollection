import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appHasPermission]'
})
export class HasPermissionDirective {
    @Input() appHasPermission: string = "";

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        //private permissionService: PermisosService
    ) { }

    ngOnInit(): void {
        // if (this.permissionService.hasPermission(this.appHasPermission)) {
        //     this.viewContainer.createEmbeddedView(this.templateRef);
        // } else {
        //     this.viewContainer.clear();
        // }
    }
}