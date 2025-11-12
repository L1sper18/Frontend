import {
  RouterOutlet,
  init_router
} from "./chunk-HYY6LHWQ.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-TV5SASVO.js";

// angular:jit:template:src\app\layout\layout.html
var layout_default;
var init_layout = __esm({
  "angular:jit:template:src\\app\\layout\\layout.html"() {
    layout_default = "<header>\r\n<h1>{{ title }}</h1>\r\n</header>\r\n<main>\r\n  <router-outlet></router-outlet>\r\n</main>\r\n<footer>\r\n  <p>{{ Dodatok }}</p>\r\n</footer>\r\n";
  }
});

// angular:jit:style:src\app\layout\layout.css
var layout_default2;
var init_layout2 = __esm({
  "angular:jit:style:src\\app\\layout\\layout.css"() {
    layout_default2 = "/* src/app/layout/layout.css */\n/*# sourceMappingURL=layout.css.map */\n";
  }
});

// src/app/layout/layout.ts
var Layout;
var init_layout3 = __esm({
  "src/app/layout/layout.ts"() {
    "use strict";
    init_tslib_es6();
    init_layout();
    init_layout2();
    init_core();
    init_router();
    Layout = class Layout2 {
      title = "\u0417\u043D\u0438\u0436\u043A\u0438 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430\u0445";
      Dodatok = "App";
    };
    Layout = __decorate([
      Component({
        selector: "app-layout",
        standalone: true,
        imports: [
          RouterOutlet
        ],
        template: layout_default,
        styles: [layout_default2]
      })
    ], Layout);
  }
});

// src/app/layout/layout.spec.ts
var require_layout_spec = __commonJS({
  "src/app/layout/layout.spec.ts"(exports) {
    init_testing();
    init_layout3();
    describe("Layout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Layout]
        }).compileComponents();
        fixture = TestBed.createComponent(Layout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_layout_spec();
//# sourceMappingURL=spec-layout.spec.js.map
