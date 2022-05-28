import { useEffect, useState } from "react"
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const Order = ({ item, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: item.id
        },
        onSuccess: () => Router.push('/orders')
    })

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(item.expiresAt) - new Date()
            setTimeLeft(Math.round(msLeft / 1000))
        }

        findTimeLeft()
        const timerId = setInterval(findTimeLeft, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [item])

    if (timeLeft < 0) {
        return <div>Order expired.</div>
    }

    return (
        <div>
            <h1>Item reserved for {timeLeft} sec</h1>
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey="pk_test_51L3lnpLMdfQvARVFzI1Wc5ifOnCLstLIT0dtSGbi6gQpldYXwFsALex9JSPc8DD2BKCWPF2YCIaMDwSHekZEPX2000BjyabhnM"
                amount={item.footwear.price * 100}
                email={currentUser.email}
            />
            {errors}
        </div>
    )
}

Order.getInitialProps = async (context, client) => {
    const { order } = context.query
    const { data } = await client.get(`/api/orders/${order}`)

    return { item: data }
}

export default Order