const OrderIndex = ({ orders }) => {
    return (
        <div>
            <table className="table my-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.footwear.title}</td>
                                <td>{order.footwear.price} €</td>
                                <td>{order.status}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            {/* <ul>
                {orders.map(order => {
                    return <li key={order.id}>
                        {order.footwear.title}, Price: {order.footwear.price} - {order.status}
                    </li>
                })}
            </ul> */}
        </div >
    )
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders')

    return { orders: data }
}

export default OrderIndex