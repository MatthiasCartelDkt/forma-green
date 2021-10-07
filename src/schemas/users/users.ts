export interface Volunteer {
    id: string;
    address: string;
    country: string;
    name: string;
    type: string;
    qr_code: string;
}

export interface Member extends Volunteer {
    subscription_date: string;
    subscription_duration: number;
    subscription_active: boolean;
}

export interface Partnership {
    id: string;
    name: string;
    gift: boolean;  
}

