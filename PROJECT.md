# Datapod Concepts

## Progressive Disclosure (UX concept)

- Datapod practices progressive disclosure in the way it can be used
- to begin working with Datapod, you basically just need to:
	- create a text file in `~~/data`
	- execute `npm run pd` (parse-data)
	- and you can immediately start editing your data in the frontend
- you can then add more item types, more data files, various kinds of sources as you go

## DpodManager

- the main object that manages data in your datapod
- it's where you get data from, your query source
- it lives in the CLI
- it is the object that backend API routes will use to perform CRUD operations on your data

## schema.datapod

- this is the file that defines the item types of an application
- item types are basically 1-to-1 with the tables in your database
- except that item types can also be of kind "document" or "dataset"
	- this makes Datapod more like a NoSQL database
- and both document and dataset items can be of structure "ItemFile" or "BatchFile"
- lives in the root of your project
- contains information about the structure and datasources of the application's item types
- here's an example of a `schema.datapod` file

```
** Users
First Name;line
Last Name;line
Email;email
Notes;paragraph
Score;wholeNumber
Birth Date;date

** Books
Title;line
Author;line
Year;wholeNumber
Description;paragraph
EXTRA_SOURCE=api:https://www.googleapis.com/books/v1/volumes?user=tanguay

** External News Items
Title;line;$idCode=headline
Link;line
Body;paragraph
SOURCE=api:https://newsapi.org/v2/everything?category=general&apiKey=[NEWSAPI_KEY]
SOURCE=api:https://newsapi.org/v2/everything?category=technology&apiKey=[NEWSAPI_KEY]
SOURCE=file:../company/news.dp.txt
SOURCE=file:/home/edward/datafeeds/news.dp.txt

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


```

## Explanation of the above schema.datapod

`users`

- this is the simplest form of an item type
- default dpodDataFileParsing is `dataset`
- default dpodDataFileCount is `single`
- default data file name is: `~~/data/users.dp.txt`
- the identical schema will be in that file as well at the top
- if a this schema in schema.datapod is changed, it will change the schema in the data file as well
- if the schema in the data file is changed, it will be changed back to the schema in schema.datapod
- so the schema in schema.datapod is the source of truth for the item type

### books

- this is an example of an item type that has two sources
- the default data file: ~~/data/books.dp.txt
- an external API
- when the front end requests "all books", it will get the books from both sources
- in the frontend item type CRUD manager, only the books from the default data file will be editable

### externalNewsItems

- this is an example of a read-only item type that has multiple sources
- two API calls to newsapi.org getting news items on general and technology topics
- two local files, one with a relative path and one with an absolute path
- note that the name of the field in the API and DpodFile data is "headline" but on the frontend it will be shown as "Title"

### logEntries and robotTrackingItems

- these are examples of item types that have a high frequency of updates and so are saved in tables in a local SQLite database
- the DpodManager provides full CRUD access
- in general, the idea is particularly for sites with a single user, the preferered format is a dpodFile
- if you have a lot of data, an SQLite file, which still keeps all data internal in the project
- if you have numerous users, then a classic MySQL or Postgres, e.g. in a Docker container or in the cloud, see comments below

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

### FileParsingType

- `dataset` - the "SQL" type (default)
	- can be copied 1-to-1 into a database table
- `custom` - the "NoSQL" type
	- enables the user to enter data in any format they want
	- requires a custom parser

### FileCountType

- `single` (default)
	- all items are saved in a single file
	- used when items are smaller and don't have fields with large amounts of text, e.g. users, comments, etc.
- `multiple`
	- each item is saved in its own file
	- useful for large items, e.g. blog posts, reports, etc.
