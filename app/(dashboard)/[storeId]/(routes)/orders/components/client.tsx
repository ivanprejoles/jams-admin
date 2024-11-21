"use client"

import { OrderColumn, PaymentColumn, columns, paymentColumns } from "./columns"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import LedSeparator from "@/components/ui/led-separator"

interface OrderClientProps {
    data: OrderColumn[]
    payment: PaymentColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data,
    payment,
}) => {

    return (    
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Track your sales"
            />
            <LedSeparator />
            <DataTable columns={columns} data={data} searchKey="products" />
            <Heading
                title={`Payment Confirmation (${data.length})`}
                description="Manage payment confirmation for your store"
            />
            <LedSeparator />
            <DataTable columns={paymentColumns} data={payment} searchKey="products" />
        </>
    )
}