const OrderIndex = ({ orders }) => {
    return (
        <div>
            <ul>
                {orders.map(order => {
                    return <li key={order.id}>
                        {order.footwear.title}, Price: {order.footwear.price} - {order.status}
                    </li>
                })}
            </ul>
        </div>
    )
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders')

    return { orders: data }
}

export default OrderIndex