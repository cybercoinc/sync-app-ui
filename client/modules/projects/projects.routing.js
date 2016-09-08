System.register(["@angular/router", "./index/index.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, index_component_1, routes, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (index_component_1_1) {
                index_component_1 = index_component_1_1;
            }
        ],
        execute: function () {
            exports_1("routes", routes = [
                { path: 'projects', component: index_component_1.IndexComponent, pathMatch: "full" },
            ]);
            exports_1("routing", routing = router_1.RouterModule.forChild(routes));
        }
    };
});
//# sourceMappingURL=projects.routing.js.map