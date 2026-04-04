# Datapod Overview

## Progressive Disclosure

- Datapod practices *progressive disclosure* as a DX concept
- this means it is very easy to begin working with
	- within minutes, you can clone it, push it, and publish a "coming soon" site at Vercel
	- within minutes, you can copy-paste a JSON, CSV, Datapod, SQLite, or Excel file to `~~/data`, or connect to an API or online SQL database, and publish the data on a page
- yet it offers increasing functionality as you need it, e.g. 
	- using the `schema.datapod` file, you can define relationships between various datasources
		- you can join data from multiple sources together using foreign keys
		- one item type can have multiple data sources, e.g. a "Books" item type can have data from a CSV file, an API, and a local text file
	- you can define custom dpodTypes
		- e.g. you could extend the `wholeNumber` dpodType as a `numberOfBookPages` dpodType for books which could have a min value of 10 and a max value of 2000
			- this enables automatic validation on the front end
			- it also better enables Datapod to identify this field in free-form text files, e.g. if it finds the number 5 or 4545, even though it is a number, it will not assume it represents the number of pages
			- you could then extend `numberOfBookPages` as `numberOfPamphletPages` to e.g. 2-50 pages
			- you could then extend `numberOfBookPages` as `numberOfMagazinePages` to e.g. 10-100 pages
			- etc.
		- custom dpodTypes can be uploaded to the Datapod Central website to be shared with others

## ItemTypes

- item types are the data collections in an application, e.g. users, books, etc.
- item types can be `dataset` or `custom` (fileParsingType)
	- `dataset` item types are analogous to tables in a relational database
		- this is item type of data coming from table-like sources, e.g. CSV, JSON, Excel, SQL tables, etc.
	- `custom` item types are more like free-form documents in a NoSQL database
		- this is item type of data coming from free-form sources, e.g. free-form JSON, free-form MD files, or free-form text files
		- Datapod has many useful tools for developers to use to quickly create parsers for these free-form data sources

## Data sources
- data sources are the sources of data for the frontend
- data sources can be:
	- local files
	- APIs
	- SQL databases
	- Excel files
	- CSV files
	- JSON files
	- MD files
	- text files
	- (anything that is easy for the user to edit)	
- data sources are parsed into JSON files for easy-access use by the frontend
	- these JSON files are stored in `~~/data-parsed`
	- they can be either `dataset` or `custom`
- data sources can be either `single` or `multiple` (fileCountType)
	- `single` means that there is only one data source for the item type (default)
		- e.g. a single CSV or Datapod file containing multiple items
	- `multiple` means that there are multiple documents, one for each item
		- e.g. a folder of text files where each file is a "report" or "contract"
		- usually these are larger, free-form documents
	- in both cases, the data from these two kinds of data sources are parsed into an item type that contains items

## Parsing

- a feature of Datapod is that item types are easy to edit, their data can be stored in:
	- text files in a dataset format that is flexible and easy to understand
	- text files in free-form format 
	- MD files
	- Excel files
- this is particularly true with free-form text files
	- typically the end user simply records their data in a text file in whatever format they want
		- the developer then uses the tools provided by Datapod to parse the data into a structured format
	- this becomes particularly useful when the end user is not technically minded
	- and this makes Datapod a powerful tool for a developer who is also the end user
		- for example, Datapod makes it very easy to parse any type of data file into a structured format, and combine this data with other data sources
- but Datapod can also easily parse classic data sources such as:
	- CSV files
	- API calls
	- SQL queries
- a strength of Datapod is that data from any of these various sources can be combined into a single item type, or joined together with foreign keys, etc.
- item types are parsed into JSON files stored in `~~/data-parsed` for easy-access use by the frontend

## DpodTypes

- each field in a `dataset` item type has a `dpodType` that defines the type of data in the field
- these are classic field types such as line (string), paragraph (text), date, datetime, wholeNumber, currency, etc.
- there are also more specific dpodTypes such as `idCode`, `logSeverity`, `latitude`, `longitude`, etc.
- dpodTypes are responsible for validation and cleansing of data
- each dpodType is a class in a file, so you can copy them, or extend them

## itemKind

- `records` - the "SQL" type (default)
	- can be copied 1-to-1 into a database table
	- this can be a `single` or `multiple` fileCountType
- `document` - the "NoSQL" type
	- enables the user to enter data in any format they want
	- requires a custom parser
	- this can be a `single` or `multiple` fileCountType

## fileParsingType

- `dataset` - the "SQL" type (default)
	- can be copied 1-to-1 into a database table
- `custom` - the "NoSQL" type
	- enables the user to enter data in any format they want
	- requires a custom parser

## fileCountType

- `single` (default)
	- all items are saved in a single file
	- used when items are smaller and don't have fields with large amounts of text, e.g. users, comments, etc.
- `multiple`
	- each item is saved in its own file
	- useful for large items, e.g. blog posts, reports, etc.

## `schema.datapod`
- this is a text file that defines the structure and origin of every item type in your application
- it is located in the root of your project
- it is simply a list of schemas from top to bottom in any order
- below are examples of every type of possible item type

### Simplest item type

```
** Users
First Name;line
Last Name;line
Email;email
Notes;paragraph
Score;wholeNumber
Birth Date;date
```

- this is the simplest form and most common form of an item type
	- it has the default fileParsingType (`dataset`) - like SQL tables
	- it has the default fileCountType (`single`) - only one data file containing all items
	- it has the default data file name (`~~/data/users.dp.txt`)
- note that it could be made even simpler:

```
** Users
First Name
Last Name
Email
Notes;p
Score;wn
Birth Date;d
```

- fields without a specified dpodType are automatically assigned the `line` dpodType
- some dataTypes have abbreviations, e.g. 
	- `p` for `paragraph`
	- `d` for `date`
	- `dt` for `dateTime`
- some field titles have a default dpodType, e.g. "Email" automatically gets the `email` dpodType
	- these can be overridden by specifying a different dpodType
- the identical schema will appear at the top of the file
	- the schema in schema.datapod is the source of truth for the item type
		- if this schema in schema.datapod is changed, it will change the schema in the data file as well
		- if the schema in the data file is changed, it will be changed back to match the schema in schema.datapod
		- note, this means that changing the schema in the data file and running the `npm run pd` command may lead to loss of data, e.g. if you change the name of a field or delete it, that field will be removed from every item in an item type that has a Datapod format, local file datasource 
			- however, it is assumed the developer is working with Git, which means that you will see the changes in Git and can revert them if needed
			- when working more robust datasources such as online or Docker MySQL or Postgres databases, there will be a warning that data will be lost, and you will have to execute `npm run pd --force` to overwrite the data

### Item type with two data sources

```
** Books
Title
Author
Year;wholeNumber
Description;p
EXTRA_SOURCE=api:https://www.tanguay.info/api/books?starting=2020-01-01
```

- this is an example of an item type that has two sources
	- (1) the default data file: `~~/data/books.dp.txt`
	- (2) an external API
- when the front end requests "all books", it will get the books from both sources
- an item type can have an unlimited number of data sources, e.g. a local dpod file, a few APIs, an Excel file, etc.
	- the schema ensures that the data from all sources is validated according to its dpodTypes
- the items that come from the local Datapod file will be editable on the frontend
	- those from the API will not be editable if the API is read-only

### System fields

- this is an example of a typical Datapod item in Datapod format:

```
==user
dpodId::G8h2jK
dpodWhenCreated::2026-03-01 10:00:00
firstName::Jürgen
lastName::Müller
email::juergen.mueller@example.de
notes::[[
Jürgen ist ein sehr erfahrener Softwarearchitekt mit über 15 Jahren Berufserfahrung. In seiner Freizeit wandert er gerne in den Alpen und engagiert sich ehrenamtlich in der lokalen Gemeinde. Er ist bekannt für seine ruhige Art und seine präzisen Problemanalysen.

Er ist auf Cloud-Infrastrukturen und Hochleistungs-Computing spezialisiert. Seine Kollegen schätzen seine Mentorenschaft und technische Führung.
]]
score::85
birthDate::1985-05-12
```

- `dpodId` and `dpodWhenCreated` are automatically generated for each item
- `dpodId` is used to identify the item
	- if a `dpodId` is provided in the data, it will be used
	- if no `dpodId` is provided, one will be generated
	- if a `dpodId` is changed, it *will not be changed* in other data sources
		- this may be added as a feature in the future
		- for now, do not change the `dpodId` manually
	- a `dpodId` is what I call an "suuid" or "short unique identifier", e.g. "G8h2jK"
		- it is a 6-character alphanumeric string
		- it is used to identify the item
		- it is generated by the system
		- it is not meant to be changed manually
		- it is both long enough to be "unique enough for most purposes" (56.8 billion combinations) yet short enough to be easily copied and even memorized for short amounts of time to e.g. to look at and then type into a new window
			- FUTURE FEATURE: be able to switch to uuid format, i.e. for applications where data items will be widely shared and have a reason to have higher uniqueness, e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6
	- `dpodWhenCreated` is the date and time that the item was created
		- it is a timestamp in the format `YYYY-MM-DD HH:MM:SS`
		- it is generated by the system
		- this enables the ability for the frontend to easily display "most recent items" and to sort based on when the item was created
	- each time `npm run pd` is run, the script checks for duplicate suuids and notifies the developer of this
      - if the CI/CI runs `npm run pd` and there are duplicate suuids, then it fails

### Scaling of parsed data in JSON-file
	- when parsed-data JSON files reach a threshold, default 500 MB, the develop will receive a message that it is recommended to switch to SQLite, or an external database
      - this is an automatic procedure which can be switched on the developer panel, i.e. each item type shows the datasources, both internal and external, and they can be switched, which automatically creates the new datasource, moves the data, and removes the old datasource
    - SQLite and other databases will automatically set up a Nuxt API route so that the frontend gets the data from there instead of from the JSON file
      - this can also be set, however, so that you can have a SQLite datasource, yet the data can be parsed to parsed-data and used from there as all other data

### Read-only external data source

```
** News Items
Title;line;$idCode=headline
Link;url
Body;p
SOURCE=api:https://newsapi.org/v2/everything?category=general&apiKey=[NEWSAPI_KEY]
SOURCE=api:https://newsapi.org/v2/everything?category=technology&apiKey=[NEWSAPI_KEY]
SOURCE=file:../company/news.dp.txt
SOURCE=file:/home/edward/datafeeds/news.dp.txt
```

- note that the sources are all defined as `SOURCE` and not `EXTRA_SOURCE`
	- this means that there is no local dpod file used
	- all data comes from other sources
		- in this case those sources are: two APIs, and two local files outside the site's project folder
	- this means that this item type is read-only
- note that the name of the field in the API and DpodFile data is `headline` but on the frontend it will be shown as `Title`
	- there are many other ways you can give meta information like this to the fields, e.g.
		- `$required`
		- `$choices=red|green|blue` 
		- `$highlighted`
		- `$default=3.5`
		- `$min=1`
		- `$max=5`
		- `$trim=false`
	- it uses the "extra syntax" of `$variable=value` separated by semicolons

### SQLite item types

```
** Log Entries
Message;line
WhenRecorded;dateTime
Severity;logSeverity
SOURCE=sqlite:~~/data/fastAccessData.sqlite

** Robot Tracking Items
Latitude;latitude
Longitude;longitude
Action;line
SOURCE=sqlite:~~/data/fastAccessData.sqlite
```

- these are two examples of item types that have a high frequency of updates and so are saved in tables in a local SQLite database
- a unique feature of Datapod is its simplicity
	- hence the default choice for data sources is a text file which is easy for a person to edit in any text editor
	- this is also easy to version control, the data stays in the project folder and the GitHub repository
- but for large amounts of data, and for data with a high volume of writes, an SQLite file is a good choice
	- since SQLite is a file, it stays internal in the project, and so can still be version controlled
	- and it is still relatively easy to edit (e.g. the free DB Browser tool on Windows/Mac/Linux)
	- the DpodManager on the frontend will also provide full CRUD access for SQLite item types

### MySQL/Postgres item types

```
** Comments
CreatedAt;dateTime
Author;line
Text;paragraph
SOURCE=mysql:host=localhost;port=3306;user=cruduser;password=[APP_DB_PASSWORD];database=app_db
```

- in general, the idea is particularly for sites with a single user, the preferered format is a Datapod text file
- if you have a lot of data, an SQLite file, which still keeps all data internal in the project
- but if you have numerous users, or sensitive data, then a classic, external MySQL or Postgres, e.g. in a Docker container or in the cloud, is a better choice

### Item types with fileCountType="multiple"

```
** Blog Posts
idCode;$deriveFromTitle
Title
Author
CreatedAt
Body;md
FILE_COUNT_TYPE=multiple
```

- the data for this item type is stored in multiple files, each file containing a single item
- the files are stored in the `~~/data/blogPosts` folder
- the files can be anything but must end with `*.dp.txt`
	- e.g. `~~/data/blogPosts/2026-03-05-tripToAmsterdam.dp.txt`
	- e.g. `~~/data/blogPosts/paris.dp.txt`
	- e.g. `~~/data/blogPosts/paris2.dp.txt`

### Custom parsing

```
// this is one file where I keep notes on all meetings I have
// in the meeting notes, I have syntax that identifies certain text as tasks and ideas
// so this one file is parsed into three item types
)) notesOnMeetings
SOURCE=file:C:/edward/filesForDailyBackup/meetings.txt

** Meetings
idCode
When;dateTime
Title
Type;choice;$choices=team|client|other
SOURCE=notesOnMeetings

** Tasks
Origin;meeting-idCode
Title
Status;choice;$choices=open|closed
SOURCE=notesOnMeetings

** Ideas
Title
Description;p
SOURCE=notesOnMeetings
```

- note the datasource file is outside the project folder
	- therefore it won't be checked into the GitHub repository
	- this is fine since this is an example of a personal site only visible locally
- note also that this is FILE_COUNT_TYPE=single by default
	- if the source file were not specified explicitly here, it would be `~~/data/notesOnMeetings.dp.txt`
- also not that since this is a custom parsed datasource, it assumes a parser:
	- `~~/cli/parsers/notesOnMeetings.js`
	- this parser needs to be custom-written for this specific item types: `meetings`, `tasks`, `ideas`

### itemKind=document

```
// this is where I keep all my ideas on various topics
// it displays on the frontend with grouping, sorting, searching, etc.
)) brainstorming
ITEM_KIND=document
FILE_COUNT_TYPE=single
```

- this data file is `~~/data/brainstorming.dp.txt`
- this produces a file `~~/data-parsed/brainstorming.json`
- and other types can define their source as `brainstorming`

### itemKind=document

// these are a texts for language learning
// they are copied from online articles, I read them, mark them up
// for example, I add a definition to words I don't know, e.g. 
// "è possibile prendere in [prestito;loan] gratuitamente"
)) learnTexts
ITEM_KIND=document
FILE_COUNT_TYPE=multiple
```

- this data files are here `~~/data/learnTexts/` e.g. 
	- `~~/data/learnTexts/it-migliori-citta-europee-2026.dp.txt`
	- `~~/data/learnTexts/fr-le-chateau-de-versailles.dp.txt`
	- `~~/data/learnTexts/es-la-fiesta-de-san-fermin.dp.txt`
- this produces a file `~~/data-parsed/learnTexts.json`
- an other types can define their source as `learnTexts`

## CI/CD
	- if `npm run pd` is executed in a CI/CD pipeline, it will break on any error
		- while run locally, it may continue and simply give the developer a message regarding the error
		- the idea is to make Datapod easy to use locally for the developer, yet solid and reliable when deployed

## Easy and free AI use
	- since Datapod is based on exporting and importing text files, Datapod creates prompts that you can copy and paste into LLMs, then copy and paste the responses back into Datapod
		- this makes it free and easy to use AI with Datapod