# Datapod Concepts

## Progressive Disclosure

- Datapod practices *progressive disclosure* as a DX concept
- this means it is very easy to begin working with, and to get a quick site up with dynamic data
- yet it offers increasing functionality as you need it
- to start, you basically:
	- create a text file with data in `~~/data`
	- execute `npm run pd` (parse-data)
	- you can immediately edit your data via the frontend or by editing the text file
- beyond that, there are many other concepts and features, described in this document

## ItemTypes

- item types are the data collections in an application, e.g. users, books, etc.
- item types can be `dataset` or `custom` (fileParsingType)
	- `dataset` item types are analogous to tables in a relational database
	- `custom` item types are more like free-form documents in a NoSQL database

## Parsing
- a unique feature of Datapod is that item types are easy to edit, their data can be stored in:
	- text files in a dataset format that is flexible and easy to understand
	- text files in free-form format 
	- MD files
	- Excel files
	- CSV files
	- API calls
	- SQL queries
	- (anything that is easy for the user to edit)
- these item types are parsed into JSON files stored in `~~/data-parsed` for easy-access use by the frontend

## DpodTypes

- each field in a `dataset` item type has a `dpodType` that defines the type of data in the field
- these are classic field types such as line (string), paragraph (text), date, datetime, wholeNumber, currency, etc.
- there are also some special dpodTypes such as `idCode`, `logSeverity`, `latitude`, `longitude`, etc.
- dpodTypes are responsible for validation and cleansing of data
- each dpodType is a class in a file, so you can copy them, or extend them

## `schema.datapod`
- this is a text file that defines the structure and origin of every item type in your application
- it is located in the root of your project
- it is simply a list of schemas from top to bottom in any order
- here are examples every type of possible item type

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
- some dataTypes have abbreviations, e.g. `p` for `paragraph`, `d` for `date`, `dt` for `dateTime`, etc.
- some field Titles have a default dpodType, e.g. "Email" has `email` dpodType
- the identical schema will be in that file as well at the top
	- if this schema in schema.datapod is changed, it will change the schema in the data file as well
	- if the schema in the data file is changed, it will be changed back to match the schema in schema.datapod
	- so the schema in schema.datapod is the source of truth for the item type

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
- the items that come from the local dpod file will be editable on the frontend
	- those from the API will not since it is read-only

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
	- in this case: two APIs and two local files outside the site's project folder
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
- a unique feature of Datapod is its simplicity, e.g. data sources that are both easy to edit and contained in the project
	- for this reason, for high-volume data, an SQLite file is a good choice
	- it keeps all data internal in the project, and so can still be version controlled
	- it is still relatively easy to edit (e.g. the free DB Browser tool on Windows/Mac/Linux)
- the DpodManager on the frontend will provide full CRUD access for SQLite item types
- in general, the idea is particularly for sites with a single user, the preferered format is a dpodFile
	- if you have a lot of data, an SQLite file, which still keeps all data internal in the project
	- if you have numerous users, then a classic MySQL or Postgres, e.g. in a Docker container or in the cloud, see the next example


```

** Comments
CreatedAt;dateTime
Author;line
Text;paragraph
SOURCE=mysql:host=localhost;port=3306;user=cruduser;password=[APP_DB_PASSWORD];database=app_db

** Blog Posts
Title;line
Author;line
Body;markdown
CreatedAt;dateTime
FILE_COUNT_TYPE=multiple
EXTRA_SOURCE=easyBlogEntryItems

)) notesOnMeetings

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

// these are files that have a simpler syntax that the BlogItem syntax 
)) easyBlogEntryItems
FILE_COUNT_TYPE=multiple

// this is the main Excel file where I keep my notes for our club
// the cinema events are on second worksheet
// note that these events can also be entered directly in the dpod file
)) cinemaEvents
SOURCE=file:~~/data/central-notes.xlsx

** Cinema Events
Title;line
When;dateTime
Location;line
Description;paragraph
EXTRA_SOURCE=cinemaEvents

# this is where I keep all my ideas on various topics
# it displays on the frontend with grouping, sorting, searching, etc.
)) brainstorming
ITEM_KIND=document
FILE_COUNT_TYPE=single

# these are a texts for language learning
# they are copied from online articles, I read them, mark them up
# for example, I add a definition to words I don't know, e.g. 
# "è possibile prendere in [prestito;loan] gratuitamente"
# in the JSON File, these are all listed separately as 
# "difficult vocabulary in this text"
# the frontend end tests the read first on these words, for instance
)) learnTexts
ITEM_KIND=document
FILE_COUNT_TYPE=multiple


// TODO: itemKind="document" as fileCountType="single"
// TODO: itemKind="document" as fileCountType="multiple"

// this is an example of a "document" item type
** 
ITEM_KIND=document

```

#### TODO: PROCESS THESE:

### comments

- this is a typical example of an item type that has multiple users, and a potential high volume of data, and so is stored in a MySQL database
- note that you can have blog posts in a dpodFile, and comments on those blog posts in a MySQL database
- so you have a single user editing blog posts, and multiple users commenting on them
- the blog posts are in text files which are easy to edit, can be edited in any editor, etc.

### blogEntries

- all items will be saved in the directory `~~/data/blogEntries/` as individual files, e.g.
	- `~~/data/blogEntries/2026-03-05-tripToAmsterdam.txt`
	- `~~/data/blogEntries/2026-03-09-tripToParis.txt`
- an example of a file would be this, notice that it has the dataset syntax for fields:

```
title::Trip to Amsterdam
author::Marco
body::[[
Walking through the narrow streets of Amsterdam, one is immediately struck by the unique architecture of the canal houses and the vibrant atmosphere of the flower markets. The city feels alive with cyclists weaving through traffic and the gentle sound of boats passing under historic stone bridges.

In the evening, the city transforms as the lights from the bridges reflect on the dark water of the canals. Cafes and bars fill with locals and tourists alike, creating a sense of "gezelligheid" that is uniquely Dutch and perfectly captures the welcoming spirit of the Netherlands.
]]
whenCreated::2026-03-05 10:00:00
```

- so this is still a dpodDatafileParsing=`dataset` but the dpodDataFileCount is `multiple`
- you would use this when each item could be extremely large which would make it difficult to have numerous items in one file
- this is also useful if you have numerous contributors, since each can create an edit their own file
	- and they can each work individually on their own file
	- then have it copied to the data directory where it immediately becomes an item in the application

### brainstorming

- this is an example of a document item type (not dataset) 
- it gets its data from `~~/data/brainstorming.dpdoc.txt` 
- that file has a custom syntax
- the user uses it to write ideas in a loose format
- but it has markers in it that can be semantically parsed
- the custom parser creates a file `~~/parsed-data/brainstorming.json`
- this JSON file is not in dataset format, but deeply nested, etc.
- it gets validated with Zod
- it is a nested object of information that the frontend uses as is
- the JSON file is not editable on the frontend interface

### learnTexts

- this is an example of a document item type (not dataset) 
- but it is alwso fileCountType="multiple"
- this means the data source is a directory of files
- the directory is `~~/data/learnTexts/`
- each "learn text" is in its own file
- the custom parser creates one JSON file: `~~/parsed-data/learnTexts.json`
- the JSON file an object with meta info about all the texts
- e.g. it has an array of all the vocabulary words from all the texts
- and also an array of all the texts

### itemKind

- `dataset` - the "SQL" type (default)
	- can be copied 1-to-1 into a database table
	- this can be a `single` or `multiple` fileCountType
- `document` - the "NoSQL" type
	- enables the user to enter data in any format they want
	- requires a custom parser
	- this can be a `single` or `multiple` fileCountType

### fileParsingType

- `dataset` - the "SQL" type (default)
	- can be copied 1-to-1 into a database table
- `custom` - the "NoSQL" type
	- enables the user to enter data in any format they want
	- requires a custom parser

### fileCountType

- `single` (default)
	- all items are saved in a single file
	- used when items are smaller and don't have fields with large amounts of text, e.g. users, comments, etc.
- `multiple`
	- each item is saved in its own file
	- useful for large items, e.g. blog posts, reports, etc.
