### კლიენტის რეგისტრაცია

``` HTTP
POST /register HTTP/1.1
Content-Type: application/json
````

#### Request Body
``` typescript
{
    clientId: number,
}
```

#### Response Body - JSON
``` typescript
{
    data: {},
    success: boolean,
    errorCode: number,
}
```
#### აღწერა
რექუესთის დროს მოცემული `clientId`-ის ნომერზე უნდა გაიგზავნოს SMS კოდი რომელიც დადასტურებაც დაჭირდება კლიენტს

---

### SMS კოდის გადამოწმება
``` HTTP
POST /validate HTTP/1.1
Content-Type: application/json
````

#### Request Body
``` typescript
{
    code: number,
}
```

#### Response Body - JSON
``` typescript
{
    data: {},
    success: boolean,
    errorCode: number,
}
```

#### აღწერა
რექუესთის დროს უნდა შემოწმდეს მოცემული `code` ემთხევა თუ არა კლიენტისთვის გაგზავნილ `code`-ს 

---

### SMS კოდის ხელახლა გაგზავნა 
- არ ვიცი ეს ფუნქცია რამდენად გაქვთ ინტეგრირებული შეიძლება ამის გარეშეც მოხდეს

``` HTTP
POST /resend HTTP/1.1
Content-Type: application/json
````

#### Request Body
``` typescript
{
    clientId: number,
}
```

#### Response Body - JSON
``` typescript
{
    data: {},
    success: boolean,
    errorCode: number,
}
```

---
### პაროლის აღდგენა 
- არ ვიცი ეს ფუნქცია რამდენად გაქვთ ინტეგრირებული შეიძლება ამის გარეშეც მოხდეს

``` HTTP
POST /restore HTTP/1.1
Content-Type: application/json
````

#### Request Body
``` typescript
{
    clientId: number,
}
```

#### Response Body - JSON
``` typescript
{
    data: {},
    success: boolean,
    errorCode: number,
}
```
#### აღწერა
რექუესთის დროს მოცემული `clientId`-ის ნომერზე უნდა გაიგზავნოს SMS კოდი რომელიც დადასტურებაც დაჭირდება კლიენტს

---

### შეკვეთა
- პროდუქტების/პაკეტების სინქრონიზაცია დაგვჭირდება


``` HTTP
POST /order HTTP/1.1
Content-Type: application/json
````

#### Request Body - დალოგინების გარეშე
``` typescript
{
    isUser: false,
    fisrtName: string,
    lastName: string,
    personalNumber: number,
    phoneNumber: number, // ex: 5XXXXXXXX
    productId: number,
}
```

#### Request Body - დალოგინებით
``` typescript
{
    isUser: true,
    clientId: number,
    productId: number,
}
```

#### Response Body - JSON
``` typescript
{
    data: {
        clientId?: number, // თუ ავტომატურად იქმნება
    },
    success: boolean,
    errorCode: number,
}
```
#### აღწერა
რექუესთის დროს 
- თუ `isUser` არის `false` მოცემულ `phoneNumber`-ზე უნდა გაიგზავნოს SMS კოდი
- თუ `isUser` არის `true` მოცემული `clientId`-ის მობილურზე უნდა გაიგზავნოს SMS კოდი

კოდის დადასტურება დაჭირდება კლიენტს

---

### საერთაშორისო ზარები
``` HTTP
GET /calls HTTP/1.1
````

#### Response Body - JSON
``` typescript
{
    data: {
        cities: [
            {
                name: string, // ენები თუ გაქვთ მაშინ ენის მიხედვით
                home: {
                    price: number,
                    code: string | number,
                },
                mobilePhone: {
                    price: number,
                    code: string | number,
                },
            }
        ]
    },
    success: boolean,
    errorCode: number,
}
```
#### აღწერა
ამაზე ალბათ მაინც დაზუსტება დაგვჭირდება. რა ინფო გაქვთ თქვენ და რისი დაბრუნება შიეძლება

---

### კლიენტის ინფორმაცია
``` HTTP
GET /client/:id HTTP/1.1
````

#### Response Body - JSON
``` typescript
{
    data: {
        {
            isActive: boolean,
            balance: number,
            expireDate: Date,
            products: number[], // პროდუქტის id-ების მასივი
        }
    },
    success: boolean,
    errorCode: number,
}
```
#### აღწერა
ამაზე ალბათ მაინც დაზუსტება დაგვჭირდება. რა ინფო გაქვთ თქვენ და რისი დაბრუნება შიეძლება