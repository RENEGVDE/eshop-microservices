import useRequest from "../../hooks/use-request"
import Router from 'next/router'

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
            <h1>{item.title}</h1>
            <h4>Price: {item.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
        </div>
    )
}

Footwear.getInitialProps = async (context, client) => {
    const { footwear } = context.query
    const { data } = await client.get(`/api/footwear/${footwear}`)

    return { item: data }
}

export default Footwear