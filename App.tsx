import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Books from "./pages/Books";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Footer from './components/Footer';

const queryClient = new QueryClient();

const books = [
  { id: '1', title: 'The Great Adventure', description: 'A thrilling journey...', coverImage: 'https://m.media-amazon.com/images/I/61dkjva5p2L._SL1500_.jpg', releaseYear: '2021' },
  { id: '2', title: 'Napoleon Diary', description: 'A thrilling tale...', coverImage: 'https://m.media-amazon.com/images/I/61ThubRehYL._SL1200_.jpg', releaseYear: '2022' },
  { id: '3', title: 'The Last Hope', description: 'A story of resilience...', coverImage: 'https://m.media-amazon.com/images/I/51DioblGBqL._SL1200_.jpg', releaseYear: '2020' },
  { id: '4', title: 'Future World', description: 'A futuristic adventure...', coverImage: 'https://m.media-amazon.com/images/I/51DioblGBqL._SL1200_.jpg', releaseYear: '2020' },
];

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log('Book ID:', id);

  const book = books.find((book) => book.id === id);
  console.log('Book Details:', book);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="md:ml-8 mt-6 md:mt-0">
          <h1 className="text-3xl font-serif font-bold">{book.title}</h1>
          <p className="text-muted-foreground mt-2">{book.releaseYear}</p>
          <p className="mt-4 text-lg">{book.description}</p>
          <button
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition-colors"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

