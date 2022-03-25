import { TenantsInterface } from "../tenantsModel";
import { PaymentInterface } from "./paymentModel";

export interface PaymentStateInterface {
    loading: boolean;
    payments: PaymentInterface[],
    tenants: TenantsInterface[],
    error: any
}