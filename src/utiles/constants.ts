import { Book } from "@/types/interfaces"

export const TAG_CONSTANTS = ['dashboard', 'reading', 'read', 'interest', 'favourite'] as const;

export const READING_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Page No'];

export const READ_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Duration to Complete', 'Notes'];

export const INTEREST_BOOK_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Suggested', 'Notes'];

export const FAVOURITE_BOOK_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Read Status', 'Notes'];

export const MOCK_BOOKS: Book[] = [
  { id: 1, title: "Silappatikaram", author: "Ilango Adigal", category: "reading", currentPage: 142 },
  { id: 2, title: "Bobby Fischer Teaches Chess", author: "Bobby Fischer", category: "reading", currentPage: 88 },
  { id: 3, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "reading", currentPage: 210 },
  { id: 4, title: "The Grandmaster's Secret", author: "Danny Gormally", category: "reading", currentPage: 45 },
  { id: 5, title: "Next.js Web Development", author: "Howard Chang", category: "reading", currentPage: 312 },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", category: "reading", currentPage: 155 },
  { id: 7, title: "My System", author: "Aron Nimzowitsch", category: "reading", currentPage: 94 },
  { id: 8, title: "You Don't Know JS Yet", author: "Kyle Simpson", category: "reading", currentPage: 62 },
  { id: 9, title: "Deep Work", author: "Cal Newport", category: "reading", currentPage: 118 },
  { id: 10, title: "Refactoring UI", author: "Adam Wathan", category: "reading", currentPage: 80 },

  { id: 11, title: "Atomic Habits", author: "James Clear", category: "read", durationToComplete: "12 days", notes: "Excellent system for continuous 1% daily improvements." },
  { id: 12, title: "Logical Chess: Move by Move", author: "Irving Chernev", category: "read", durationToComplete: "3 weeks", notes: "Explains the structural reasoning behind every single move." },
  { id: 13, title: "Pragmatic Programmer", author: "Andrew Hunt", category: "read", durationToComplete: "14 days", notes: "Great tips on keeping code DRY and maintainable." },
  { id: 14, title: "Think and Grow Rich", author: "Napoleon Hill", category: "read", durationToComplete: "10 days", notes: "Classic mental mindset framework." },
  { id: 15, title: "The Amateur's Mind", author: "Jeremy Silman", category: "read", durationToComplete: "18 days", notes: "Invaluable breakdown of common low-level positional mistakes." },
  { id: 16, title: "HTML and CSS: Design and Build Websites", author: "Jon Duckett", category: "read", durationToComplete: "7 days", notes: "Beautifully visual introduction to web layouts." },
  { id: 17, title: "The Alchemist", author: "Paulo Coelho", category: "read", durationToComplete: "4 days", notes: "Inspiring story about following your true path." },
  { id: 18, title: "Show Your Work!", author: "Austin Kleon", category: "read", durationToComplete: "3 days", notes: "Encouraging guide on sharing your learning journey online." },
  { id: 19, title: "Endgame Strategy", author: "Mikhail Shereshevsky", category: "read", durationToComplete: "25 days", notes: "Masterclass on king and pawn positioning principles." },
  { id: 20, title: "Zero to One", author: "Peter Thiel", category: "read", durationToComplete: "6 days", notes: "Fascinating thoughts on innovation and market monopolies." },

  { id: 21, title: "Pro Next.js Architecture", author: "Alex Ruiz", category: "interest", suggestedBy: "Tech Newsletter", notes: "Covers complex layout states and server vs client optimization." },
  { id: 22, title: "Dune", author: "Frank Herbert", category: "interest", suggestedBy: "Friend", notes: "Heard the world-building is legendary." },
  { id: 23, title: "Chess Endgames", author: "Yasser Seirawan", category: "interest", suggestedBy: "Chess.com Blog", notes: "Need this to fix structural calculation errors in rapid play." },
  { id: 24, title: "TypeScript Deep Dive", author: "Basarat Ali Syed", category: "interest", suggestedBy: "GitHub Trends", notes: "Highly recommended for mastering advanced type structures." },
  { id: 25, title: "The Psychology of Money", author: "Morgan Housel", category: "interest", suggestedBy: "Podcast", notes: "Focuses on behavior and steady low-risk investment strategies." },
  { id: 26, title: "Gitanjali", author: "Rabindranath Tagore", category: "interest", suggestedBy: "Library Catalog", notes: "Poetic collection to read during quiet hours." },
  { id: 27, title: "Learning SQL", author: "Alan Beaulieu", category: "interest", suggestedBy: "StackOverflow", notes: "Crucial for backing up future web app databases cleanly." },
  { id: 28, title: "The Creative Act", author: "Rick Rubin", category: "interest", suggestedBy: "YouTube Interview", notes: "Philosophical take on staying motivated to build personal projects." },
  { id: 29, title: "Fundamental Chess Openings", author: "Paul van der Sterren", category: "interest", suggestedBy: "Reddit r/chess", notes: "To build a clean opening repertoire for rapid games." },
  { id: 30, title: "Understanding SVG", author: "Sara Soueidan", category: "interest", suggestedBy: "Twitter Dev Community", notes: "Will help with fine-tuning pixel-perfect UI vectors." },

  { id: 31, title: "Poonachi", author: "Perumal Murugan", category: "favourite", readStatus: "Completed", notes: "A beautiful, realistic social commentary told through a unique perspective." },
  { id: 32, title: "Ponniyin Selvan", author: "Kalki Krishnamurthy", category: "favourite", readStatus: "Completed", notes: "Masterpiece historical epic. Outstanding character development." },
  { id: 33, title: "Silman's Complete Endgame Course", author: "Jeremy Silman", category: "favourite", readStatus: "In Progress", notes: "The ultimate tier-by-tier chess rating guide. My go-to book." },
  { id: 34, title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "favourite", readStatus: "Completed", notes: "Short but punchy. Completely changed how I evaluate functional scope." },
  { id: 35, title: "Aram", author: "Jeyamohan", category: "favourite", readStatus: "Completed", notes: "Deeply moving short stories rooted in regional ethics and culture." },
  { id: 36, title: "The 5 AM Club", author: "Robin Sharma", category: "favourite", readStatus: "Completed", notes: "Highly motivating patterns for maximizing daily focus routines." },
  { id: 37, title: "Advanced Chess Tactics", author: "Lev Psakhis", category: "favourite", readStatus: "In Progress", notes: "Incredibly sharp calculations that push spatial awareness limits." },
  { id: 38, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "favourite", readStatus: "Completed", notes: "Tough layout to read at first, but excellent for deep sandbox exercises." },
  { id: 39, title: "Velpari", author: "S. Venkatesan", category: "favourite", readStatus: "Plan to Read", notes: "Highly recommended by local book circles for its rich description of nature." },
  { id: 40, title: "Drive", author: "Daniel H. Pink", category: "favourite", readStatus: "Completed", notes: "Explains autonomy and mastery—great fuel for independent developers." }
];
