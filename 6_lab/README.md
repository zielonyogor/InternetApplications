# ASP .NET MVC

## 1. What are the responsibilities of each layer of the MVC architecture and how are they connected?

- **M** (Model) - Representation of data used in app. Retrieves and stores data from database. Uses validation logic and business rules.
- **V** (View) - What is rendered on the page, UI. A View is a `.cshtml` file, that contains HTML
- **C** (Controller) - handles web requests like GET, POST, DELETE. It also renders View with a Model. Default routing format:

    `/[Controller]/[ActionName]/[Parameters]`

Everything is connected in Controller in order to have a fully working page.

## 2. What are the naming conventions for models, controllers, controller actions, views folders and views themselves?

- Everything written in PascalCase
- Models should be named `[name of data].cs` and stored in `/Models`
- Controllers should be named `[name of data]sController.cs` and stored in `/Controllers`
- Controller actions should be named how we want them to look in browser
- Views should be named by the correct **ActionName** and be stored in folder `/Views` and subfolder correct to name of their controller

### Example

Suppose we want to have a data about **books**. We also want to list those games, edit, add or delete them in a `/Book` route. We will create model `Book.cs`, `BookController.cs` and a folder `/Views/Book` with views such as `Index.cshtml`, `Create.cshtml`, `Edit.cshtml` and any other views that the user want to be a separate page. In controller we will need to create method for each of those views and any other web requests we would need. Those methods have to be named the same as views like `Index.cshtml` and `public IActionResult Index()` if using just `return View()`. If we want to return other view, we need to specify it with `return View("Index")`.

## 3. How to pass data from controllers to views (2 options)?

### First option

In controller:

``` csharp
    public async Task<IActionResult> Index()
    {
        var data = await _context.Books.ToListAsync();
        return View(data);
    }
```

In a view:

``` html
    @Model IEnumerable<TutorialApp.Models.Movie>
```

### Second option

In controller:

``` csharp
    public IActionResult Detail()
    {
        ViewData["Message"] = "Message is here";
        return View();
    }
```

In a view:

``` html
    <h2>Message: @ViewData["Message"]</h2>
```

## 4. How to map URL’s to controller actions?

Default pattern: `/[Controller]/[ActionName]/[Parameters]`

Example Controller methods to handle **POST** on `/Movies/Edit/4`

``` csharp
    [HttpPost]
    public IActionResult Detail(int id, Movie movie)
    {
        // logic here...
    }
```

## 5. How to restrict controller actions to be executed only via certain HTTP request types (e.g., only via POST)?

With an attribute on a selected controller action: `[HttpPost]`, `[HttpGet]`, etc.

## 6. How to make sure a controller action can only be called through a form on our website and not through some external request?

By using antiforgery token. All user needs to do is add this to scripts.

### Controller

``` csharp
    [HttpPost]
    [ValidateAntiForgeryToken]
    public Task<IActionResult> Create()
    {
        // Rest of code...
    }
```

### View

``` html
    <form asp-action="Create" method="post">
        @Html.AntiForgeryToken()
        <!-- Form here -->
    </form>
```

## 7. Where do you define data validation and how do you ensure it in views and controllers?

Data validation can be done with attributes from library `System.ComponentModel.DataAnnotations` in model. For example we can set range and an appropiate error message for a field with:

``` csharp
    [Range(10, 1000, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public int MyInteger { get; set; }
```

In controller before updating/posting any data, we can check:

``` csharp
    if (ModelState.IsValid)
    {
        // Do any other neccessary validation
        return RedirectToPage((nameof(Index)));
    }
    return View(data);
```
