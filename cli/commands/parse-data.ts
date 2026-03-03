import * as parserFlashcards from "../parsers/parser-flashcards";
import * as parserUsers from "../parsers/parser-users";
import * as parserBooks from "../parsers/parser-books";
import * as qdev from "../qtools/qdev";

qdev.clearDebug();

// parserFlashcards.parseFlashcards();
parserUsers.parseUsers();
parserBooks.parseBooks();

