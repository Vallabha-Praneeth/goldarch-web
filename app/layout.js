import { ThemeProvider } from '../lib/theme-context';
import './globals.css';

export const metadata = {
  title: 'Gold.Arch Construction CRM',
  description: 'Supplier and project management for Gold.Arch Construction',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
