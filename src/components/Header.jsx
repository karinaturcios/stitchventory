import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stitchventory</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/inventory" className="hover:underline">Inventory</Link></li>
            <li><Link to="/projects" className="hover:underline">Projects</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}