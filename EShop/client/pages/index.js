// import buildClient from '../api/build-client'
import Link from 'next/link'

const LandingPage = ({ currentUser, footwear }) => {
    console.log(footwear)
    return (
        <div>
            <h2>Footwear</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        footwear.map(footwear => {
                            return (
                                <tr key={footwear.id}>
                                    <td>{footwear.title}</td>
                                    <td>{footwear.price}</td>
                                    <td>
                                        <Link href="/footwear/[footwear]" as={`/footwear/${footwear.id}`}>
                                            <a>View</a>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
    // const client = buildClient(context)
    // const {data} = await client.get('/api/users/currentuser')

    // return data

    const { data } = await client.get('/api/footwear')

    return { footwear: data }
}

export default LandingPage
