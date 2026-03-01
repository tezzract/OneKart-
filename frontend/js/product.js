const API = 'http://localhost:3000/api';   // Sets the base URL for all backend API calls.

function getToken() { return localStorage.getItem('token'); }

/*

**What it does:** Goes to the browser's notebook and reads whatever is saved under the label `'token'`.

A **token** is like a **temporary ID badge** — when you log in, the server gives you one to prove you're authenticated. It typically looks something like this when stored:
 for example : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */



  /* 1--> localstorage --  Think of localStorage as a small notebook that lives in your browser. 
Websites can write information to it and read it back later — even if you close and reopen the tab.
 It stores everything as text (strings). 
  */ 



function getUser() 
//   fetch the user data from localStorage: // 

{ const u = localStorage.getItem('user');return u ? JSON.parse(u) : null; } 


  /* This is asking: "Did we actually get something back?"

If yes (u has a value) → convert the text into a real JavaScript object with JSON.parse() and return it
If no (u is null, meaning no user is saved) → just return null */ 

/* After JSON.parse(), instead of raw text you get a usable object like:
js{ name: "John Smith", email: "john@gmail.com" } */

// This might return something like '{"name":"John Smith","email":"john@gmail.com"}' — notice it's just text, not a real object yet. // 



function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

/* What is a "Toast"?
A toast is a small pop-up notification that briefly appears on screen then disappears automatically — like when you add something to a cart and see "Added to cart!" 
for a couple seconds. It's called a toast because it pops up, like bread from a toaster. */ 

/* msg is the text you want to display, like "Added to cart!". Whoever calls this function decides what the message says, for example:
showToast('Added to cart!'); */

/*  const t = document.getElementById('toast');

This reaches into the HTML and grabs the element with id="toast". It's stored in t so we don't have to keep typing document.getElementById('toast') repeatedly. */ 


/*  t.textContent = msg;
Whatever was passed in as msg gets inserted as the visible text inside the toast element. So if you called showToast('Item removed!'), the toast would display "Item removed!". */

/*  t.classList.add('show');
This adds a CSS class called 'show' to the element. The CSS for that class likely does something like fade it in or slide it onto the screen, for example: */


/* setTimeout(() => t.classList.remove('show'), 2500);
```
This is a **timer**. Breaking it down further:

- `setTimeout()` says *"wait, then do something"*
- `2500` is the wait time in **milliseconds** (2500ms = 2.5 seconds)
- `() => t.classList.remove('show')` is the thing to do after waiting — it removes the `'show'` class, which hides the toast again

---

### The Full Flow Visualized
```
showToast('Added to cart!') is called
        ↓
Find the #toast element
        ↓
Set its text to 'Added to cart!'
        ↓
Add 'show' class → toast becomes visible
        ↓
    ... 2.5 seconds pass ...
        ↓
Remove 'show' class → toast disappears */

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/*
  ============================================
  FUNCTION: renderStars(rating)
  ============================================
  PURPOSE:
  Converts a numeric rating (e.g. 4.5) into a
  visual star string (e.g. ★★★★½☆)

  EXAMPLE:
  renderStars(4.5) → ★★★★½☆
  renderStars(3)   → ★★★☆☆
  renderStars(5)   → ★★★★★
  ============================================

  PARAMETERS:
  - rating: a number between 0 and 5 (e.g. 4.5)

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) const full = Math.floor(rating);
     ─────────────────────────────────
     Math.floor() rounds DOWN to the nearest whole number.
     This gives us the number of FULL stars.
     e.g. Math.floor(4.5) = 4
     e.g. Math.floor(3.2) = 3

  2) const half = rating % 1 >= 0.5 ? 1 : 0;
     ─────────────────────────────────────────
     The % (modulo) operator gives us the DECIMAL part of rating.
     e.g. 4.5 % 1 = 0.5
     e.g. 4.2 % 1 = 0.2

     Then we ask: is that decimal >= 0.5?
       - YES → half = 1 (show a half star)
       - NO  → half = 0 (no half star)

     This is a TERNARY operator, a one-line if/else:
     condition ? valueIfTrue : valueIfFalse

  3) const empty = 5 - full - half;
     ────────────────────────────────
     We always want exactly 5 stars total.
     So empty stars = 5 minus the full and half stars.
     e.g. for rating 4.5: 5 - 4 - 1 = 0 empty stars
     e.g. for rating 3.0: 5 - 3 - 0 = 2 empty stars

  4) return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
    ──────────────────────────────────────────────────────────────────
     This builds the final star string in 3 parts:

     PART 1 → '★'.repeat(full)
     Repeats the full star character (★) by however
     many full stars we calculated.
     e.g. '★'.repeat(4) = '★★★★'

     PART 2 → (half ? '½' : '')
     Another ternary — if half is 1 (truthy), add '½'.
     If half is 0 (falsy), add nothing ('').

     PART 3 → '☆'.repeat(empty)
     Repeats the empty star character (☆) for remaining slots.
     e.g. '☆'.repeat(2) = '☆☆'

     All 3 parts are joined with + to make one string.

  ============================================
  FULL EXAMPLE WALKTHROUGH (rating = 3.5):
  ============================================
  full  = Math.floor(3.5) = 3
  half  = 3.5 % 1 = 0.5 → 0.5 >= 0.5 → half = 1
  empty = 5 - 3 - 1 = 1

  return '★'.repeat(3) + '½' + '☆'.repeat(1)
       = '★★★' + '½' + '☆'
       = '★★★½☆'
  ============================================
*/
function updateNavbar() {
  const user = getUser();
  const nav = document.getElementById('navAccount');
  if (user && nav) {
    nav.querySelector('.nav-line1').textContent = `Hello, ${user.name.split(' ')[0]}`;
    nav.href = '#';
    nav.onclick = () => {
      if (confirm('Sign out?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.reload();
      }
    };
  }
  updateCartCount();
}

/*
  ============================================
  FUNCTION: updateNavbar()
  ============================================
  PURPOSE:
  Personalizes the navigation bar for a logged-in
  user. Shows their first name, sets up a sign-out
  button, and updates the cart item count.

  EXAMPLE RESULT:
  Not logged in → navbar stays as default
  Logged in     → navbar shows "Hello, John"
                  clicking it asks to sign out
  ============================================

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) const user = getUser();
     ────────────────────────
     Calls the getUser() function we already have
     which reads the user object from localStorage.
     If no one is logged in, user will be NULL.
     If logged in, user will be something like:
     { name: "John Smith", email: "john@gmail.com" }

  2) const nav = document.getElementById('navAccount');
     ────────────────────────────────────────────────────
     Grabs the navbar account link/button element
     from the HTML using its id "navAccount".
     This is the element we are going to modify.

  3) if (user && nav) { ... }
     ─────────────────────────
     A GUARD CONDITION — only run the code inside
     if BOTH conditions are true:
       - user → someone is actually logged in
       - nav  → the navbar element actually exists
     If either is missing, we skip everything inside
     and avoid errors.

  ============================================
  INSIDE THE IF BLOCK:
  ============================================

  4) nav.querySelector('.nav-line1').textContent = `Hello, ${user.name.split(' ')[0]}`;
     ─────────────────────────────────────────────────────────────────────────────────
     This line does THREE things:

     PART 1 → nav.querySelector('.nav-line1')
     Searches INSIDE the nav element for a child
     element with the class "nav-line1" and grabs it.

     PART 2 → user.name.split(' ')[0]
     Takes the user's full name and splits it into
     an array at every space character.
     e.g. "John Smith".split(' ') = ["John", "Smith"]
     Then [0] grabs the FIRST item = "John"
     This gives us just the first name.

     PART 3 → .textContent = `Hello, ${user.name.split(' ')[0]}`
     Sets the visible text of that element using a
     TEMPLATE LITERAL (backtick string).
     The ${} injects the first name dynamically.
     e.g. result = "Hello, John"

  5) nav.href = '#';
     ─────────────────
     Sets the link destination to '#' which means
     "go nowhere" — it keeps the user on the same
     page when they click the navbar account button.
     We handle the actual click behavior in the next line.

  6) nav.onclick = () => { ... };
     ──────────────────────────────
     Assigns a CLICK HANDLER to the nav element.
     This is an arrow function that runs every time
     the user clicks the account button in the navbar.

  ============================================
  INSIDE THE ONCLICK:
  ============================================

  7) if (confirm('Sign out?')) { ... }
     ────────────────────────────────────
     confirm() is a built-in browser function that
     shows a popup dialog with two buttons: OK and Cancel.
       - User clicks OK     → returns true  → run the code inside
       - User clicks Cancel → returns false → do nothing

  8) localStorage.removeItem('token');
     localStorage.removeItem('user');
     ───────────────────────────────────
     Deletes both the auth token and user data
     from localStorage, effectively logging the
     user out by erasing their saved session.

  9) location.reload();
     ────────────────────
     Refreshes the entire page. Since the user
     data is now gone from localStorage, the navbar
     will revert back to its default logged-out state.

  ============================================
  AFTER THE IF BLOCK:
  ============================================

  10) updateCartCount();
      ───────────────────
      Always runs whether the user is logged in or not.
      Reads the cart from localStorage and updates
      the cart item count badge in the navbar.
      Kept outside the if block so even guests
      (not logged in) see their cart count.

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  updateNavbar() is called
          ↓
  Get user from localStorage
          ↓
  Get navbar element from HTML
          ↓
  Is user logged in AND navbar exists?
       ↙ YES              ↘ NO
  Show "Hello, John"     Skip personalization
  Set href to '#'
  Attach sign-out click handler
       ↓                    ↓
       └──────────┬──────────┘
                  ↓
          updateCartCount()
          (always runs)
  ============================================
*/
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

/*
  ============================================
  FUNCTION: updateCartCount()
  ============================================
  PURPOSE:
  Reads the cart from localStorage, adds up the
  total number of items, and displays that number
  on the cart badge/icon in the navbar.

  EXAMPLE RESULT:
  Cart has 3 items → badge shows "3"
  Cart is empty    → badge shows "0"
  ============================================

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) const cart = JSON.parse(localStorage.getItem('localCart') || '[]');
     ────────────────────────────────────────────────────────────────────
     This line does THREE things chained together:

     PART 1 → localStorage.getItem('localCart')
     Reads the cart data saved in the browser's
     localStorage under the key 'localCart'.
     If nothing is saved yet, this returns NULL.

     PART 2 → || '[]'
     The || (OR) operator is a FALLBACK.
     It says: "if the left side is null/empty,
     use the right side instead."
     '[]' is an empty array as a STRING.
     So if no cart exists yet, we default to '[]'
     instead of crashing on null.

     PART 3 → JSON.parse(...)
     localStorage only stores TEXT (strings).
     JSON.parse() converts that text back into
     a real JavaScript array we can work with.
     e.g. '[{"productId":1,"quantity":2}]'
     becomes → [{ productId: 1, quantity: 2 }]

     FULL EXAMPLE:
     Cart exists   → JSON.parse('[{"productId":1,"quantity":2}]')
                   → [{ productId: 1, quantity: 2 }]
     Cart is empty → JSON.parse('[]')
                   → []

  2) const el = document.getElementById('cartCount');
     ──────────────────────────────────────────────────
     Grabs the HTML element that displays the cart
     count badge (usually a small number bubble on
     the cart icon in the navbar).
     Stored in 'el' so we don't repeat ourselves.
     e.g. <span id="cartCount">0</span>

  3) if (el) el.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
     ────────────────────────────────────────────────────────────────────────
     This line has TWO parts:

     PART 1 → if (el)
     A GUARD CHECK — only run the rest if the
     cartCount element actually exists on this page.
     Not every page may have a cart badge, so this
     prevents a crash if the element is missing.

     PART 2 → cart.reduce((sum, i) => sum + i.quantity, 0)
     reduce() is an ARRAY METHOD that loops through
     every item in the cart and accumulates a result.

     It takes two arguments:
       - A callback function → (sum, i) => sum + i.quantity
       - A starting value   → 0

     HOW reduce() WORKS STEP BY STEP:
     Imagine the cart has these items:
     [
       { productId: 1, quantity: 2 },
       { productId: 2, quantity: 3 },
       { productId: 3, quantity: 1 }
     ]

     Loop 1: sum = 0, i = { productId:1, quantity:2 } → 0 + 2 = 2
     Loop 2: sum = 2, i = { productId:2, quantity:3 } → 2 + 3 = 5
     Loop 3: sum = 5, i = { productId:3, quantity:1 } → 5 + 1 = 6
     Final result → 6

     So el.textContent = 6
     The cart badge now shows "6"

  ============================================
  VARIABLE NAMES EXPLAINED:
  ============================================
  sum → the running total that builds up each loop
  i   → shorthand for "item", the current cart item
        being looked at in each loop iteration
  el  → shorthand for "element", the cart badge

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  updateCartCount() is called
          ↓
  Read 'localCart' from localStorage
          ↓
  Nothing saved yet?
    ↙ YES              ↘ NO
  Default to '[]'    Use saved cart data
          ↓                ↓
          └──────┬──────────┘
                 ↓
         Convert text → real array
                 ↓
         Find #cartCount element
                 ↓
         Does element exist?
           ↙ YES       ↘ NO
    Add up all          Do nothing
    quantities          (no crash)
    with reduce()
           ↓
    Display total
    on cart badge
  ============================================
*/








function addToLocalCart(productId, qty = 1) {
  let cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const existing = cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }
  localStorage.setItem('localCart', JSON.stringify(cart));
  updateCartCount();
  showToast('Added to cart!');
}
/*
  ============================================
  FUNCTION: addToLocalCart(productId, qty = 1)
  ============================================
  PURPOSE:
  Adds a product to the cart stored in localStorage.
  If the product already exists in the cart, it
  increases the quantity. If it's new, it adds it
  as a fresh entry. Then saves, updates the badge,
  and shows a confirmation toast.

  EXAMPLE RESULT:
  Cart is empty + add product 5 → [{ productId: 5, quantity: 1 }]
  Product 5 exists  + add 2 more → [{ productId: 5, quantity: 3 }]
  ============================================

  ============================================
  PARAMETERS:
  ============================================
  - productId → the unique ID of the product
                being added to the cart
                e.g. 42

  - qty = 1   → how many to add. The "= 1" is a
                DEFAULT PARAMETER, meaning if no
                qty is passed in, it automatically
                uses 1 as the value.
                e.g. addToLocalCart(42)    → adds 1
                e.g. addToLocalCart(42, 3) → adds 3

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) let cart = JSON.parse(localStorage.getItem('localCart') || '[]');
     ──────────────────────────────────────────────────────────────────
     Reads the existing cart from localStorage.
     Uses 'let' instead of 'const' because we will
     be MODIFYING the cart contents later.

     localStorage.getItem('localCart') → gets saved cart text
     || '[]'    → if nothing saved yet, default to empty array text
     JSON.parse → converts text back into a real JS array

     e.g. text '[{"productId":1,"quantity":2}]'
          becomes → [{ productId: 1, quantity: 2 }]

  2) const existing = cart.find(i => i.productId === productId);
     ─────────────────────────────────────────────────────────────
     find() is an ARRAY METHOD that loops through
     the cart and returns the FIRST item that matches
     the condition, or UNDEFINED if nothing matches.

     The condition → i.productId === productId
     For each item 'i' in the cart, check if its
     productId matches the one we're trying to add.

     EXAMPLE:
     cart = [{ productId: 1, quantity: 2 }, { productId: 5, quantity: 1 }]
     addToLocalCart(5, 1)
     find() checks:
       item 1 → productId 1 === 5? NO
       item 2 → productId 5 === 5? YES → returns this item
     existing = { productId: 5, quantity: 1 }

     If product is NOT in cart:
     existing = undefined (falsy)

  ============================================
  THE IF / ELSE BLOCK:
  ============================================

  3) if (existing) {
       existing.quantity += qty;
     }
     ─────────────────────────────
     If 'existing' found a match (is not undefined),
     the product is ALREADY in the cart.
     So we just increase its quantity by qty.

     += is a SHORTHAND for:
     existing.quantity = existing.quantity + qty

     EXAMPLE:
     existing = { productId: 5, quantity: 1 }
     qty = 2
     existing.quantity += 2 → quantity is now 3

     Because 'existing' is a REFERENCE to the actual
     object inside the cart array, modifying it here
     automatically updates the cart array too.

  4) else {
       cart.push({ productId, quantity: qty });
     }
     ──────────────────────────────────────────
     If 'existing' is undefined, the product is
     NOT in the cart yet, so we add it fresh.

     push() adds a new item to the END of the array.

     { productId, quantity: qty } is a new cart item object.
     'productId' is SHORTHAND for productId: productId
     (when the key and variable name are the same,
     you only need to write it once in modern JS)

     EXAMPLE:
     cart = [{ productId: 1, quantity: 2 }]
     addToLocalCart(5, 1)
     cart.push({ productId: 5, quantity: 1 })
     cart = [{ productId: 1, quantity: 2 }, { productId: 5, quantity: 1 }]

  ============================================
  SAVING AND UPDATING:
  ============================================

  5) localStorage.setItem('localCart', JSON.stringify(cart));
     ──────────────────────────────────────────────────────────
     Saves the updated cart back to localStorage.
     localStorage can only store TEXT so we use
     JSON.stringify() to convert our array back
     into a string before saving.

     e.g. [{ productId: 5, quantity: 1 }]
          becomes → '[{"productId":5,"quantity":1}]'

     This OVERWRITES the old cart with the new one.

  6) updateCartCount();
     ────────────────────
     Calls the updateCartCount() function to
     immediately refresh the cart badge number
     in the navbar so the user sees the updated total.

  7) showToast('Added to cart!');
     ──────────────────────────────
     Calls showToast() to pop up a brief
     "Added to cart!" confirmation message
     so the user knows their action worked.

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  addToLocalCart(productId, qty) is called
                ↓
  Read existing cart from localStorage
                ↓
  Search cart for matching productId
                ↓
  Product already in cart?
        ↙ YES              ↘ NO
  Increase its          Add it as a
  quantity by qty       new entry
        ↓                    ↓
        └────────┬────────────┘
                 ↓
      Save updated cart to localStorage
                 ↓
      Update cart badge count in navbar
                 ↓
      Show "Added to cart!" toast
  ============================================
*/

async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    document.getElementById('productDetail').innerHTML = '<div class="loading">Product not found.</div>';
    return;
  }

  try {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const p = await res.json();

/*
  ============================================
  FUNCTION: loadProduct()
  ============================================
  PURPOSE:
  Reads the product ID from the page URL, fetches
  that product's data from the backend API, and
  prepares it to be displayed on the page.
  If anything goes wrong (no ID, bad response)
  it handles the error gracefully.

  EXAMPLE URL:
  product.html?id=42
  This function reads that '42' and fetches
  the product with ID 42 from the server.
  ============================================

  ============================================
  KEY CONCEPTS BEFORE WE START:
  ============================================

  ASYNC / AWAIT:
  The 'async' keyword means this function contains
  code that takes TIME to complete (like fetching
  data from a server). Instead of freezing the
  whole page while waiting, JavaScript continues
  running other things.

  'await' is used INSIDE async functions to say:
  "pause HERE and wait for this to finish before
  moving to the next line."

  Think of it like ordering food at a restaurant:
  - You place your order (fetch request)
  - You don't stand frozen at the counter waiting
  - You go sit down (JS keeps running other things)
  - When food is ready you continue (await resumes)

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) const params = new URLSearchParams(window.location.search);
     ────────────────────────────────────────────────────────────
     window.location.search reads the QUERY STRING
     part of the current page URL — everything
     after and including the '?' symbol.

     e.g. for URL: product.html?id=42&color=red
     window.location.search = '?id=42&color=red'

     new URLSearchParams() converts that raw string
     into an object we can easily read values from.
     Think of it as turning:
     '?id=42&color=red'
     into a neat lookup table:
     { id: '42', color: 'red' }

  2) const id = params.get('id');
     ─────────────────────────────
     .get('id') reads the value of the 'id' key
     from the URL params object we just created.

     e.g. URL is product.html?id=42
     params.get('id') → '42'

     e.g. URL is product.html (no id)
     params.get('id') → null

  ============================================
  THE GUARD BLOCK:
  ============================================

  3) if (!id) {
       document.getElementById('productDetail').innerHTML =
         '<div class="loading">Product not found.</div>';
       return;
     }
     ────────────────────────────────────────────
     ! means NOT. So !id means "if id is falsy"
     (null, undefined, empty string, etc.)

     If no ID was found in the URL, there's nothing
     to fetch. So we:

     STEP 1 → Show an error message on the page
     by injecting HTML directly into the
     #productDetail element using innerHTML.

     STEP 2 → return
     Immediately STOPS the function from running
     any further. Everything below this point
     is skipped entirely.
     Without 'return' the code would keep running
     and crash trying to fetch with no ID.

  ============================================
  THE TRY / CATCH BLOCK:
  ============================================

  The try/catch is an ERROR HANDLING structure.
  Code inside 'try' is attempted. If anything
  inside throws an error, execution immediately
  jumps to 'catch' to handle it gracefully
  instead of crashing the whole page.

  Think of it like:
  try    → "attempt this risky thing"
  catch  → "if it fails, do this instead"

  ============================================
  INSIDE THE TRY BLOCK:
  ============================================

  4) const res = await fetch(`${API}/products/${id}`);
     ──────────────────────────────────────────────────
     fetch() makes an HTTP GET request to the server.
     'await' pauses here until the server responds.

     The URL is built using a TEMPLATE LITERAL:
     API = 'http://localhost:3000/api'
     id  = '42'
     Result → 'http://localhost:3000/api/products/42'

     'res' (short for response) is what the server
     sends back. It contains:
       - A status code (200 = OK, 404 = not found etc.)
       - The actual data (not readable yet, see step 6)

  5) if (!res.ok) throw new Error('Product not found');
     ────────────────────────────────────────────────────
     res.ok is a BOOLEAN that is:
       - true  → server returned a success code (200-299)
       - false → server returned an error code (404, 500 etc.)

     If res.ok is false (!res.ok = true), we manually
     THROW an error with a custom message.

     throw immediately stops the try block and sends
     execution to the catch block, just like if an
     error had happened naturally.

     e.g. product ID doesn't exist on server
     → server returns 404
     → res.ok = false
     → throw triggers
     → catch block runs

  6) const p = await res.json();
     ──────────────────────────────
     Even though we have the response, the actual
     DATA inside it hasn't been read yet.
     .json() reads and parses the response body
     from JSON text into a real JavaScript object.
     'await' pauses again until this is done.

     'p' (short for product) now holds something like:
     {
       id: 42,
       title: 'Wireless Headphones',
       price: 49.99,
       originalPrice: 79.99,
       rating: 4.5,
       reviews: 1200,
       image: 'headphones.jpg',
       description: 'Great sound quality...',
       prime: true,
       inStock: true
     }

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  loadProduct() is called
          ↓
  Read URL for ?id= parameter
          ↓
  Was an ID found in the URL?
      ↙ NO                 ↘ YES
  Show "Product         Continue to fetch
  not found"
  Stop function
  (return)
          ↓
  Send GET request to API
  e.g. /api/products/42
          ↓
  Did server respond OK?
      ↙ NO                 ↘ YES
  throw Error           Read response
  → jump to catch       body as JSON
                              ↓
                        'p' now contains
                        the product data
                        ready to display
  ============================================
*/ 




document.title = `${p.title} - OneKart`;
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);

    /*
  ============================================
  LINES: document.title & discount calculation
  ============================================
  PURPOSE:
  Line 1 → Dynamically updates the browser tab
  title to include the product name.
  Line 2 → Calculates the discount percentage
  between the original and current price.

  EXAMPLE RESULT:
  p.title = 'Wireless Headphones'
  Browser tab shows → 'Wireless Headphones - OneKart'

  p.price         = 49.99
  p.originalPrice = 79.99
  discount        = 38 (meaning 38% off)
  ============================================

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) document.title = `${p.title} - OneKart`;
     ──────────────────────────────────────────
     document.title is a built-in browser property
     that controls the text shown on the browser
     TAB at the top of the window.

     By default it shows whatever is in the HTML:
     <title>OneKart</title>

     Here we OVERWRITE it dynamically using a
     TEMPLATE LITERAL (backtick string) to inject
     the product's title into it.

     ${p.title} pulls the title from the product
     object 'p' that we fetched from the API.

     EXAMPLE:
     p.title = 'Wireless Headphones'
     document.title = 'Wireless Headphones - OneKart'

     WHY THIS MATTERS:
     - Makes each product page have a unique tab title
     - Better for SEO (search engines read tab titles)
     - Better UX (user knows what tab they're on)
     - Without this, every product page would just
       show the default 'OneKart' in the tab

  ============================================

  2) const discount = Math.round((1 - p.price / p.originalPrice) * 100);
     ─────────────────────────────────────────────────────────────────────
     Calculates what PERCENTAGE has been discounted
     off the original price. Let's break this down
     piece by piece from the INSIDE OUT:

     ─────────────────────────────────────────────
     STEP 1 → p.price / p.originalPrice
     ─────────────────────────────────────────────
     Divides the current price by the original price.
     This gives us a DECIMAL representing what
     FRACTION of the original price we are paying.

     EXAMPLE:
     p.price         = 49.99
     p.originalPrice = 79.99
     49.99 / 79.99   = 0.6249...
     Meaning we are paying about 62.5% of the
     original price.

     ─────────────────────────────────────────────
     STEP 2 → 1 - p.price / p.originalPrice
     ─────────────────────────────────────────────
     Subtracts that fraction FROM 1.
     Since 1 = 100%, subtracting tells us what
     PORTION is being discounted (saved).

     EXAMPLE:
     1 - 0.6249 = 0.3750...
     Meaning 37.5% is being discounted off.

     WHY SUBTRACT FROM 1?
     Think of it this way:
     Original price = 100% of the price
     Current price  = 62.5% of the price
     Discount       = 100% - 62.5% = 37.5%
     That's exactly what 1 - (price/original) does.

     ─────────────────────────────────────────────
     STEP 3 → (...) * 100
     ─────────────────────────────────────────────
     Multiplies by 100 to convert the decimal
     into a proper PERCENTAGE number.

     EXAMPLE:
     0.3750 * 100 = 37.50

     ─────────────────────────────────────────────
     STEP 4 → Math.round(...)
     ─────────────────────────────────────────────
     Math.round() rounds the result to the nearest
     WHOLE NUMBER. Discount percentages are always
     shown as whole numbers, not decimals.

     EXAMPLE:
     Math.round(37.50) = 38
     Math.round(37.49) = 37

     FINAL RESULT:
     discount = 38
     Meaning the product is 38% off.

  ============================================
  MORE EXAMPLES END TO END:
  ============================================

  EXAMPLE 1 → Big discount
  p.price         = 25.00
  p.originalPrice = 100.00
  25 / 100        = 0.25
  1 - 0.25        = 0.75
  0.75 * 100      = 75
  Math.round(75)  = 75
  discount        = 75 (75% off)

  EXAMPLE 2 → Small discount
  p.price         = 95.00
  p.originalPrice = 100.00
  95 / 100        = 0.95
  1 - 0.95        = 0.05
  0.05 * 100      = 5
  Math.round(5)   = 5
  discount        = 5 (5% off)

  EXAMPLE 3 → No discount
  p.price         = 100.00
  p.originalPrice = 100.00
  100 / 100       = 1
  1 - 1           = 0
  0 * 100         = 0
  Math.round(0)   = 0
  discount        = 0 (0% off)

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  Product data 'p' is fetched from API
          ↓
  Update browser tab title
  "Wireless Headphones - OneKart"
          ↓
  Calculate discount:
  Current price ÷ Original price
          ↓
  Subtract from 1
  (flip to get the discount portion)
          ↓
  Multiply by 100
  (convert to percentage)
          ↓
  Round to whole number
          ↓
  discount = 38
  (ready to display as "-38%" on the page)
  ============================================
*/




  
















    // Quantity options
    let qtyOptions = '';
    for (let i = 1; i <= 10; i++) {
      qtyOptions += `<option value="${i}">Qty: ${i}</option>`;
    }
    /*
  ============================================
  SNIPPET: Quantity Options Builder
  ============================================
  PURPOSE:
  Builds a string of HTML <option> elements
  for a quantity dropdown selector, giving the
  user choices from 1 to 10 items to purchase.

  EXAMPLE RESULT:
  After the loop, qtyOptions will be a string
  that looks like this:
  <option value="1">Qty: 1</option>
  <option value="2">Qty: 2</option>
  <option value="3">Qty: 3</option>
  ... all the way to ...
  <option value="10">Qty: 10</option>

  This gets injected into a <select> element
  on the page to create a dropdown like:
  [ Qty: 1 ▼ ]
  ============================================

  ============================================
  LINE BY LINE BREAKDOWN:
  ============================================

  1) let qtyOptions = '';
     ─────────────────────
     Creates an EMPTY STRING variable called
     qtyOptions using 'let' (not 'const') because
     we are going to keep ADDING to it inside
     the loop.

     Think of it as an empty container we will
     fill up one piece at a time.

     WHY 'let' AND NOT 'const'?
     'const' cannot be reassigned or changed
     after it's created. Since we're building
     this string up piece by piece with +=
     we need 'let' which allows changes.

  ============================================

  2) for (let i = 1; i <= 10; i++) { ... }
     ────────────────────────────────────────
     A standard FOR LOOP. It has 3 parts
     separated by semicolons:

     PART 1 → let i = 1
     The STARTING point. We create a counter
     variable 'i' and start it at 1 (not 0,
     because we want quantities starting at 1,
     not 0).

     PART 2 → i <= 10
     The CONDITION checked before every loop.
     Keep looping as long as i is less than
     or equal to 10.
     When i reaches 11 this becomes false
     and the loop STOPS.

     PART 3 → i++
     Runs AFTER each loop iteration.
     i++ is shorthand for i = i + 1.
     It increments the counter by 1 each time.

     LOOP SEQUENCE:
     i = 1  → condition 1 <= 10? YES → run code
     i = 2  → condition 2 <= 10? YES → run code
     i = 3  → condition 3 <= 10? YES → run code
     ...
     i = 10 → condition 10 <= 10? YES → run code
     i = 11 → condition 11 <= 10? NO  → STOP

     Total iterations: 10 (one per quantity option)

  ============================================

  3) qtyOptions += `<option value="${i}">Qty: ${i}</option>`;
     ──────────────────────────────────────────────────────────
     This line runs ONCE PER LOOP and builds the
     HTML string piece by piece.

     += is SHORTHAND for:
     qtyOptions = qtyOptions + (new piece)
     It APPENDS to whatever is already in qtyOptions
     rather than replacing it.

     The value in backticks is a TEMPLATE LITERAL
     that generates one HTML option element.
     ${i} injects the current loop number into
     both the value attribute and display text.

     WHAT IS AN <option> ELEMENT?
     It's one choice inside an HTML <select> dropdown.
     value="${i}" → the data sent when this is selected
     Qty: ${i}   → the text the USER sees in the dropdown

     EACH ITERATION PRODUCES:
     i = 1  → <option value="1">Qty: 1</option>
     i = 2  → <option value="2">Qty: 2</option>
     i = 3  → <option value="3">Qty: 3</option>
     ... and so on

     AFTER ALL 10 LOOPS qtyOptions equals:
     '<option value="1">Qty: 1</option>
      <option value="2">Qty: 2</option>
      <option value="3">Qty: 3</option>
      <option value="4">Qty: 4</option>
      <option value="5">Qty: 5</option>
      <option value="6">Qty: 6</option>
      <option value="7">Qty: 7</option>
      <option value="8">Qty: 8</option>
      <option value="9">Qty: 9</option>
      <option value="10">Qty: 10</option>'

  ============================================
  HOW IT GETS USED AFTER:
  ============================================
  qtyOptions is injected into a <select> element
  inside the product page HTML like this:

  <select id="qtySelect">
    (qtyOptions goes here)
  </select>

  Which renders on the page as a dropdown:
  ┌─────────────┐
  │ Qty: 1    ▼ │
  ├─────────────┤
  │ Qty: 2      │
  │ Qty: 3      │
  │ Qty: 4      │
  │ ...         │
  │ Qty: 10     │
  └─────────────┘

  When the user picks "Qty: 3" and clicks
  "Add to Cart", the value "3" is passed to
  addToLocalCart() as the qty argument.

  ============================================
  FULL FLOW VISUALIZED:
  ============================================

  Start with empty string qtyOptions = ''
              ↓
  Loop begins at i = 1
              ↓
  Is i <= 10?
      ↙ YES              ↘ NO (i = 11)
  Add option HTML        STOP loop
  to qtyOptions          qtyOptions is complete
  Increment i            and ready to use
      ↓
  Repeat loop
  ============================================
*/ 
document.getElementById('productDetail').innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.title}">
      </div>
      <div class="product-info">
        <h1>${p.title}</h1>
        <div class="detail-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating}</span>
          <a href="#">${p.reviews.toLocaleString()} ratings</a>
        </div>
        <div class="detail-price-box">
          ${discount > 0 ? `<span class="detail-discount">-${discount}%</span>` : ''}
          <span class="detail-price">$${p.price.toFixed(2)}</span>
          ${discount > 0 ? `<div><span class="detail-original-price">List Price: $${p.originalPrice.toFixed(2)}</span></div>` : ''}
        </div>
        ${p.prime ? '<div style="margin:8px 0;font-size:14px;"><strong style="color:#00485e;">prime</strong> FREE delivery</div>' : ''}
        <div class="product-description">
          <h3>About this item</h3>
          <p>${p.description}</p>
        </div>
      </div>
      <div class="buy-box">
        <div class="buy-price">$${p.price.toFixed(2)}</div>
        <div class="${p.inStock ? 'in-stock' : 'out-of-stock'}">${p.inStock ? 'In Stock' : 'Out of Stock'}</div>
        ${p.inStock ? `
          <select class="qty-select" id="qtySelect">${qtyOptions}</select>
          <button class="btn-add-cart" onclick="addToLocalCart(${p.id}, parseInt(document.getElementById('qtySelect').value))">Add to Cart</button>
          <button class="btn-buy-now" onclick="addToLocalCart(${p.id}, parseInt(document.getElementById('qtySelect').value)); location.href='cart.html'">Buy Now</button>
        ` : ''}
        <div style="margin-top:12px; font-size:12px; color:#565959;">
          <div>Ships from: OneKart</div>
          <div>Sold by: OneKart</div>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById('productDetail').innerHTML = '<div class="loading">Product not found.</div>';
  }
}

// Search handler
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('searchCategory').value;
  let url = 'index.html?';
  if (query) url += `search=${encodeURIComponent(query)}&`;
  if (category) url += `category=${encodeURIComponent(category)}&`;
  location.href = url;
});

document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  loadProduct();
});
