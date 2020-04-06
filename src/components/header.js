import React from 'react'
import { Link } from 'gatsby'

import Logo from '../img/techtrails-logo.svg'

const Header = () => (
	<header>
		<Link to="/" className="site-logo">
			<Logo />
		</Link>
	</header>
)

export default Header