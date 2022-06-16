import useRequest from "../../hooks/use-request"
import Router from 'next/router'
import footwearImg from "../../img/footwear.png";

const Footwear = ({ item }) => {
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            footwearId: item.id
        },
        onSuccess: (order) => Router.push('/orders/order', `/orders/${order.id}`)
    })

    return (
        <div>
            {/* <div className="jumbotron mt-5">
                <div className="wide-cropped"
                    style={{ "background-image": `url(${footwearImg.src})` }}>
                </div>
                <h1 className="display-4"></h1>
                <hr className="my-4" />
                <p>Price:  €</p>
                {errors}
                <button onClick={() => doRequest()} className="btn btn-primary mb-5">Purchase</button>
            </div> */}

            <div className="card mt-5 purchase-card">
                <img className="card-img-top purchase-img" src={footwearImg.src} alt="Footwear img" />
                <div className="card-body">
                    <h1 className="card-title">{item.title}</h1>
                    <p className="card-text">Price: {item.price} €</p>
                    {errors}
                    <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
                </div>
            </div>

            {/* <h1>{item.title}</h1>
            <h4>Price: {item.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button> */}
        </div>
    )
}

Footwear.getInitialProps = async (context, client) => {
    const { footwear } = context.query
    const { data } = await client.get(`/api/footwear/${footwear}`)

    return { item: data }
}

export default Footwear