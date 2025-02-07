import './global.css';
import NavBar from './components/NavBar.tsx';
import { AuthProvider } from './Providers';

export const metadata = {
  title: 'darkChatRooms',
  description: 'Wake up having never gone to bed.',
}

export default function RootLayout({ children }) {
  return (
	<html lang="en">
	  <head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	  </head>
	  <body>
	  	<AuthProvider>
			<header>
				<NavBar />
			</header>
				{children}
			<footer className="absolute bottom-2 right-2">Copyright 2024 Mack Sawyer</footer>
		</AuthProvider>
	  </body>
	</html>
  )
}
