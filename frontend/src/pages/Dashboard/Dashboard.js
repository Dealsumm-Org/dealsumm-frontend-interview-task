import React, {useEffect, useState} from "react";
import { Line } from '@ant-design/plots';
import { DatePicker, Spin, Typography } from 'antd';
import http from "../../util/http";
import _ from "lodash";
import moment from "moment";
import "./Dashboard.css";
const { RangePicker } = DatePicker;

const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
];

function Dashboard () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [date, setDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!date) {
            setFilteredData(data)
            return
        }

        setFilteredData(data.filter(i => moment(i.date).isBetween(date[0], date[1], null, '[]')))
    }, [date]);

    const fetchData = async () => {
        setLoading(true)

        try {
            const { tenants = [], payments = []} = await http.get(`get_dataset`);

            let formattedData = payments.map(p => Object.entries(_.omit(p, 'payment_date'))
                .map(([k,v]) => {
                    const id = Number(k.split('_')[1]);
                    const tenant = _.find(tenants, { 'id': id });

                    return {
                        tenant: tenant.name,
                        value: v || 0,
                        date: p.payment_date,
                    }
            }))

            formattedData = _.flatten(formattedData)

            setTitle(tenants[0] ? tenants[0].project_name + ' - ' + tenants[0].property_name : '')
            setData(formattedData);
            setFilteredData(formattedData);
            setLoading(false)
        } catch (err) {
            console.log('fetch data failed', err);
            setLoading(false)
        }
    }

    const config = {
        data: filteredData,
        xField: 'date',
        yField: 'value',
        seriesField: 'tenant',
        color: COLOR_PLATE_10,
        legend: {
            position: 'right-top',
            offsetX: 8,
            title: {
                text: 'Payment amounts per tenant',
                spacing: 16,
            },
            itemValue: {
                formatter: (text, item) => {
                    const items = filteredData.filter((d) => d.tenant === item.value);
                    return '- ' + Math.round(items.reduce((sum, i) => sum + i.value, 0));
                },
                style: {
                    opacity: 0.65,
                },
            },
        },
        tooltip: {
            customItems: (originalItems) => {
                let total = originalItems.reduce((sum, i) => sum + (+i.value), 0)

                return ([{
                    name: 'Total income over time',
                    value: Math.round(total),
                },
                    ...originalItems]);
            }
        },
    };

    const onChange = (date) => {
        setDate(date)
    }

    return (
        <div className="container">
            {loading ? <Spin size="large" /> : (<div>
                <Typography.Title level={3} style={{ marginBottom: 40 }}>
                    {title}
                </Typography.Title>
                <RangePicker onChange={onChange} style={{ marginBottom: 80 }} />
                <Line {...config} />
            </div>)}
        </div>
    )
}

export default Dashboard;
