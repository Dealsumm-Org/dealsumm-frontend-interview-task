import React, { useEffect, useMemo } from "react";
import { PaymentInterface } from "../../shared/models/paymentModels/paymentModel";
import { TenantsInterface } from "../../shared/models/tenantsModel";

import './totalInfo.scss'

interface TotalInfoProps {
	payments: PaymentInterface[];
	tenants: TenantsInterface[];
}

type DataItem = {
	name: string;
	projectName: string;
	propertyName: string;
	count: number;
}
type DataType = Record<string, DataItem>

const TotalInfo: React.FC<TotalInfoProps> = ({
	payments,
	tenants
}) => {
	const data: DataType = useMemo(() => {
		return tenants.reduce((acc: DataType, item: TenantsInterface) => {
			acc[`tenant_${item.id}`] = {
				name: item.name,
				projectName: item.project_name,
				propertyName: item.property_name,
				count: 0,
			};
			return acc;
		}, {})
	}, [tenants]);

	const getInitialData = (): DataType => {
		return tenants.reduce((acc: DataType, item: TenantsInterface) => {
			acc[`tenant_${item.id}`] = {
				name: item.name,
				projectName: item.project_name,
				propertyName: item.property_name,
				count: 0,
			};
			return acc;
		}, {})
	}

	const totalInfo: {data: DataType, total: 0} = useMemo(() => {
		return payments.reduce((acc: {data: DataType, total: 0}, item: PaymentInterface) => {
			Object.entries(item).forEach(([key, value]) => {
				if (key !== 'payment_date') {
					acc.data[key].count += value ? value : 0;
					acc.total += value ? value : 0;
				}
			})
			return acc;
		}, {data: getInitialData(), total: 0})
	}, [payments, tenants]);

	useEffect(() => {
		console.log({payments, tenants, data, totalInfo})
	}, [totalInfo])

   return (
		<div className="info-container">
			{Object.keys(totalInfo.data).map((key) => (
				<div key={key}>
					<span>{totalInfo.data[key].name}</span>
					<span className="mr-10">:</span>
					<span>{totalInfo.data[key].count}</span>
				</div>
			))}
			<div>
					<span>Total</span>
					<span className="mr-10">:</span>
					<span>{totalInfo.total}</span>
			</div>
		</div>
	)
}

export default TotalInfo;