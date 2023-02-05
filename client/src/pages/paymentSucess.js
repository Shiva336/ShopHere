import React from 'react'
import { useSearchParams } from "react-router-dom"
import { useParams } from 'react-router-dom'
const PaymentSuccess = () => {

    // const seachQuery = useSearchParams()[0]

    // const referenceNum = seachQuery.get("reference")
    let {referenceNum} = useParams();
    return (
        <div>
            <div>

                <h1> Order Successfull</h1>

                <p>
                    Reference No.{referenceNum}
                </p>

            </div>
        </div>
    )
}

export default PaymentSuccess