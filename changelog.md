**Task 1.  Introduction**

1. Project is created and pushed to Github.   
2. Configured linters settings
3. Added First Component
4. Added Product Component
5. Added Product List Component
6. Added Cart Component 

**Task 2. Components**
1. App is divided to modules
2. Created ProductListComponent, ProductComponent
3. Products are delivered using getProducts method of ProductsService
4. Implemented ability to add products to a cart (button Add is displayed only if product is available)
5. Created CartListComponent, CartItemComponent
6. Added opportunity to modify cart products quantity and remove them
7. Added method co CartService for calculation of total cart's products cost
8. Used @ViewChild for rendering CartListComponent's title
9. Added custom directive ChangeBackgroundDirective for changing host element background color
10. Added ability for batch remove products from cart

**Task 3. Services and DI**  
1. Existing `CartService` was corrected to match all task requirements.   
2. Created `AboutComponent` for temporary testing of DI mentioned below.
3. Created (and registered in `AppModule` using `useClass`) `LocalStorageService` to provide the same functionality as native `window.localStorage`.  
4. Created (and registered in `@Injectable` decorator) `ConfigOptionsService` to store/get options. Under the hood id uses `LocalStorageService` from above.
5. Created (and registered using `useValue` in `AppModule`) `ConstantsService` as ready object literal.
6. Created (and registered in `AppModule` using `useFactory` ) `GeneratorService` and `GeneratorFactory` for generating random string with specified length 
7. Created `HighlightOnClickDirective` which uses `Renderer2`, `ElementRef`, `@HostListener` to change `background` and `border` of hosted element on `click`. (added in `ProductComponent` on product description field)

**Task 4. Pipes**
1. Used `currency`, `uppercase`, `date` pipes in `product.component.html`
2. Made `getProducts` method of `ProductsService` to return observable and used `async` build in pipe to extract data in template `product-list.component.html`.
3. Implemented `OrderByPipe` according to the task requirements and used in `cart.component.html`
4. App modules was refactored according to the task requirements. `CommonModule`, `FormsModule` now are provided by `SharedModule`. Additionally implemented `MaterialModule`, which reexports all needed `MatModules` to `SharedNodule`
