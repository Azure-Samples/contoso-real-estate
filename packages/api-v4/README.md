# Instructions for using the API-V4

Azure Functions v4 is the latest version of the Node.js programming model for Azure Functions. It comes with a bunch of new features and improvements, such as:

* Flexible folder structure
* Being able to define function.json directly in the function's in the code
* New HTTP trigger types
* Improved IntelliSense
* Timer Trigger (TypeScript)
* Durable Functions (TypeScript)
  
I wrote an article explaining how this whole migration process went and how you can do the same. You can read the article [here](https://techcommunity.microsoft.com/t5/educator-developer-blog/step-by-step-guide-migrating-v3-to-v4-programming-model-for/ba-p/3897691).

## How to run the new api-v4?

It's very important that, as soon as you clone this repository, create the `local.settings.json` file and add the following block of code:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}
```

This file, will allow you to enable the v4 programming model. For more information, read [Upgrade to v4 of the Node.js programming model for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-node-upgrade-v4?tabs=vs-code-set-indexing-flag%2Cv4#enable-the-v4-programming-model).

Then, at the root of the project, run the `npm start` command and the 7 ports will be opened. Go to the `PORT` tab in Codespaces. You can specifically access the API-V4 through port `7071`, testing the endpoint: `<your-codespaces-url>.app.github.dev/api/listings` and you will see the following endpoint return: `(GET): listings`

<details><summary><b>Listings - json</b></summary>
<br/>

```json
[
   {
      "id":1,
      "title":"Bright apartment close to the park",
      "slug":"practical-loft-downtown",
      "created_at":"2014-12-23T09:00:00.000Z",
      "bathrooms":"2",
      "bedrooms":"4",
      "description":"Perfect for young professionals. Modern home with master suite on the main floor and a studio apartment above the garage.",
      "type":"Land",
      "is_featured":"0",
      "is_recommended":"0",
      "photos":[
         "pic-pink.png",
         "pic-purple.png",
         "pic-green.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"4",
      "ammenities":[
         "local_parking|Parking",
         "elevator|Elevator",
         "hot_tub|Jacuzzi"
      ],
      "reviews_stars":"1",
      "reviews_number":"133",
      "is_favorited":"0",
      "address":[
         "91",
         "Unjagub",
         "NL",
         "AK",
         "Ilcap Center",
         "67364",
         "(123.5275",
         "79.64447)"
      ],
      "fees":[
         "72",
         "12",
         "54",
         "2850",
         "63",
         "EUR:€"
      ],
      "updated_at":"2023-01-23T15:31:31.871Z",
      "published_at":"2023-01-23T15:31:31.706Z",
      "created_by_id":null,
      "updated_by_id":null
   },
   {
      "id":7,
      "title":"Practical loft downtown",
      "slug":"beautiful-home-in-a-great-neighborhood",
      "created_at":"2021-01-13T09:00:00.000Z",
      "bathrooms":"1",
      "bedrooms":"1",
      "description":"Great home for entertaining. Best value in the neighborhood.",
      "type":"Mobile Home",
      "is_featured":"0",
      "is_recommended":"1",
      "photos":[
         "pic-orange.png",
         "pic-yellowgreen.png",
         "pic-salmon.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"2",
      "ammenities":[
         "microwave_gen|Microwave",
         "fireplace|Fireplace",
         "deck|Terrace"
      ],
      "reviews_stars":"0",
      "reviews_number":"302",
      "is_favorited":"0",
      "address":[
         "6",
         "Votzowiz",
         "SH",
         "WV",
         "Irkoj Turnpike",
         "46485",
         "(-164.7396",
         "9.42274)"
      ],
      "fees":[
         "37",
         "32",
         "89",
         "2907",
         "74",
         "GBP:£"
      ],
      "updated_at":"2023-01-23T15:31:31.879Z",
      "published_at":"2023-01-23T15:31:31.706Z",
      "created_by_id":null,
      "updated_by_id":null
   },
   {
      "id":9,
      "title":"Charming apartment close to the mall",
      "slug":"perfect-for-young-professionals",
      "created_at":"2022-08-31T09:00:00.000Z",
      "bathrooms":"1",
      "bedrooms":"4",
      "description":"Spacious home with a large yard. Wonderful neighborhood with many amenities.",
      "type":"Single Family",
      "is_featured":"0",
      "is_recommended":"1",
      "photos":[
         "pic-yellowgreen.png",
         "pic-green.png",
         "pic-blue.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"3",
      "ammenities":[
         "dishwasher_gen|Dishwasher",
         "self_improvement|Gym",
         "info|No Furniture"
      ],
      "reviews_stars":"0",
      "reviews_number":"241",
      "is_favorited":"0",
      "address":[
         "43",
         "Owhozru",
         "IC",
         "NM",
         "Sijwew Trail",
         "09747",
         "(-144.4056",
         "69.6599)"
      ],
      "fees":[
         "95",
         "26",
         "72",
         "2927",
         "46",
         "USD:$"
      ],
      "updated_at":"2023-01-23T15:31:31.878Z",
      "published_at":"2023-01-23T15:31:31.706Z",
      "created_by_id":null,
      "updated_by_id":null
   },
   {
      "id":15,
      "title":"Great home for a first time home buyer",
      "slug":"charming-house-close-to-the-train-station",
      "created_at":"2022-08-16T09:00:00.000Z",
      "bathrooms":"3",
      "bedrooms":"2",
      "description":"Beautiful home in a great neighborhood. This home has a large yard and is close to downtown.",
      "type":"Commercial",
      "is_featured":"0",
      "is_recommended":"1",
      "photos":[
         "pic-green.png",
         "pic-bluegreen.png",
         "pic-yellowgreen.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"2",
      "ammenities":[
         "hot_tub|Sauna",
         "self_improvement|Gym",
         "hvac|Heating"
      ],
      "reviews_stars":"2",
      "reviews_number":"348",
      "is_favorited":"0",
      "address":[
         "62",
         "Fapewup",
         "NU",
         "TN",
         "Tovu Trail",
         "00499",
         "(149.7475",
         "45.09032)"
      ],
      "fees":[
         "16",
         "10",
         "66",
         "1673",
         "29",
         "EUR:€"
      ],
      "updated_at":"2023-01-23T15:31:31.973Z",
      "published_at":"2023-01-23T15:31:31.706Z",
      "created_by_id":null,
      "updated_by_id":null
   },
   {
      "id":21,
      "title":"Beautiful home in a great neighborhood",
      "slug":"cozy-apartment-in-the-heart-of-the-city",
      "created_at":"2022-09-05T09:00:00.000Z",
      "bathrooms":"2",
      "bedrooms":"1",
      "description":"Beautiful home in a great neighborhood. This home has a large yard and is close to downtown.",
      "type":"Townhouse",
      "is_featured":"0",
      "is_recommended":"1",
      "photos":[
         "pic-purple.png",
         "pic-bluegreen.png",
         "pic-salmon.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"1",
      "ammenities":[
         "microwave_gen|Microwave",
         "heat_pump|Air Conditioning",
         "fireplace|Fireplace"
      ],
      "reviews_stars":"3",
      "reviews_number":"281",
      "is_favorited":"0",
      "address":[
         "54",
         "Neppohowu",
         "MF",
         "NV",
         "Olip Junction",
         "69280",
         "(129.2841",
         "7.67614)"
      ],
      "fees":[
         "96",
         "40",
         "79",
         "2744",
         "96",
         "INR:₹"
      ],
      "updated_at":"2023-01-23T15:31:32.053Z",
      "published_at":"2023-01-23T15:31:31.706Z",
      "created_by_id":null,
      "updated_by_id":null
   },
   {
      "id":27,
      "title":"Luminous apartment in the heart of the city",
      "slug":"many-amenities-in-the-neighborhood",
      "created_at":"2022-09-12T09:00:00.000Z",
      "bathrooms":"3",
      "bedrooms":"2",
      "description":"Spacious home with a large yard. Wonderful neighborhood with many amenities.",
      "type":"Townhouse",
      "is_featured":"0",
      "is_recommended":"1",
      "photos":[
         "pic-purple.png",
         "pic-bluegreen.png",
         "pic-orange.png",
         "pic-green.png",
         "pic-yellowgreen.png"
      ],
      "capacity":"2",
      "ammenities":[
         "wifi|Wi-Fi",
         "local_laundry_service|Laundry Room",
         "self_improvement|Gym"
      ],
      "reviews_stars":"2",
      "reviews_number":"141",
      "is_favorited":"0",
      "address":[
         "96",
         "Sakuade",
         "NP",
         "CT",
         "Cujiz Manor",
         "72130",
         "(-5.4029",
         "3.58657)"
      ],
      "fees":[
         "82",
         "91",
         "81",
         "1680",
         "34",
         "EUR:€"
      ],
      "updated_at":"2023-01-23T15:31:32.068Z",
      "published_at":"2023-01-23T15:31:31.707Z",
      "created_by_id":null,
      "updated_by_id":null
   }
]
```
</details>
<br/>

If you have any questions, don't hesitate to contact me by opening an issue directly in the repository.


