- Datapod Concepts
	- DpodManager
		- the main object that manages data in your datapod
		- it's where you get data from, your query source
		- it lives in the CLI
		- it is the object that backend API routes will use to perform CRUD operations on your data
	- schema.datapod
		- this is the file that defines the item types of an application
		- item types are basically 1-to-1 with the tables in your database
			- except that item types can also be of kind "document" or "dataset"
				- this makes Datapod more like a NoSQL database
			- and both document and dataset items can be of structure "ItemFile" or "BatchFile"
		- lives in the root of your project
		schemas, datasources for the item types in your application
		- here's an example of a schema.datapod file
			------------------------------------------------
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
			DPOD_DATA_STRUCTURE=itemFiles

			)) Meetings
			DPOD_DATA_FILE_COUNT=single

			)) Howtos
			DPOD_DATA_FILE_COUNT=multiple

			TODO: make item types that are parsed out of Meetings and Howtos above
			------------------------------------------------
		- users
			- this is the simplest form of an item type
			- default data kind is "dataset"
			- default data structure is "batchFile"
			- default data file name is: ~~/data/users.dp.txt
			- the identify schema will be in that file as well at the top
				- if a this schema in schema.datapod is changed, it will change the schema in the data file as well
				- if the schema in the data file is changed, it will be changed back to the schema in schema.datapod
				- so the schema in schema.datapod is the source of truth for the item type
		- books
			- this is an example of an item type that has two sources
				- the default data file: ~~/data/books.dp.txt
				- an external API
			- when the front end requests "all books", it will get the books from both sources
			- in the frontend item type CRUD manager, only the books from the default data file will be editable
		- externalNewsItems
			- this is an example of a read-only item type that has multiple sources
				- two API calls to newsapi.org getting news items on general and technology topics
				- two local files, one with a relative path and one with an absolute path
			- note that the name of the field in the API and DpodFile data is "headline" but on the frontend it will be shown as "Title"
		- logEntries and robotTrackingItems
			- these are examples of item types that have a high frequency of updates and so are saved in tables in a local SQLite database
			- the DpodManager provides full CRUD access
			- in general, the idea is particularly for sites with a single user, the preferered format is a dpodFile
				- if you have a lot of data, an SQLite file, which still keeps all data internal in the project
				- if you have numerous users, then a classic MySQL or Postgres, e.g. in a Docker container or in the cloud, see comments below
		- comments
			- this is a typical example of an item type that has multiple users, and a potential high volume of data, and so is stored in a MySQL database
			- note that you can have blog posts in a dpodFile, and comments on those blog posts in a MySQL database
				- so you have a single user editing blog posts, and multiple users commenting on them
				- the blog posts are in text files which are easy to edit, can be edited in any editor, etc.
		- blogEntries
			- will be saved in ~~/data/blogEntries/ as individual files, e.g.
				- ~~/data/blogEntries/2026-03-05-tripToAmsterdam.txt
				- ~~/data/blogEntries/2026-03-09-tripToParis.txt
			- the structure of these files would be e.g.
				-------------------------------------------
				title::Trip to Amsterdam
				author::Edward
				body::[[
					I had a great time in Amsterdam.
				]]
				whenCreated::2026-03-05 10:00:00
				-------------------------------------------
			- so this is still a DpodDataKind="dataset" but the DpodDataStructure is "itemFiles"
			- you would use this when each item could be extremely large which would make it difficult to have numerous in one file
			- this is also useful if you have numerous contributors, each can create an edit their own file and then e.g. have it copied to the data directory where it immediately becomes an item in the application
	- DpodDataFileParsing
		- dataset (default)
		- custom
	- DpodDataFileCount
		- single (default)
		- multiple