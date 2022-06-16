import Link from 'next/link'

export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Signup', href: '/auth/signup' },
        !currentUser && { label: 'Signin', href: '/auth/signin' },
        currentUser && {label: 'Sell Footwear', href: '/footwear/new'},
        currentUser && {label: 'Orders', href: '/orders'},
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className="nav-item">
                    <Link href={href}>
                        <a className='nav-link nv-lnk'>{label}</a>
                    </Link>
                </li>
            )
        })

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link href="/">
                <a className='navbar-brand mx-3'>RUSNVC</a>
            </Link>

            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>
                    {links}
                </ul>
            </div>
        </nav>
    )
}