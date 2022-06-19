// import buildClient from '../api/build-client'
import Link from 'next/link'
import footwearImg from "../img/footwear.png";

const LandingPage = ({ currentUser, footwear }) => {
    console.log(footwear)
    return (
        <div className="container">
            <h1 className='text-center'>Footwear</h1>
            <div className="row">
                {
                    footwear.map(footwear => {
                        return (
                            <div className="col-4">
                                <div className="card mt-5" key={footwear.id}>
                                    <img className="card-img-top" src={footwearImg.src} alt="Footwear img"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{footwear.title}</h5>
                                        <p className="card-text">Price: {footwear.price} €</p>
                                        <Link href="/footwear/[footwear]" as={`/footwear/${footwear.id}`}>
                                            <a className="btn btn-primary">View</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                    {/* <table className="table">
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

                                                <a>View</a>
                                            </Link>
                                        </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table> */}
            </div>
        </div >
    )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
    // const client = buildClient(context)
    // const {data} = await client.get('/api/users/currentuser')

    // return data

    const { data } = await client.get('/api/footwear').catch(err => console.log(err.message))

    return { footwear: data }
}


export default LandingPage
