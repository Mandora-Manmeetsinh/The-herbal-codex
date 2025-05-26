
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode; 
  fullHeight?: boolean;
}

const Layout = ({ children, fullHeight = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${fullHeight ? 'pt-16' : 'pt-24 pb-8'}`}>
        {children}
      </main>
      {!fullHeight && <Footer />}
    </div>
  );
};

export default Layout;
