export interface OrderItem {
  itemId: string | number;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderPayload {
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  items: OrderItem[];
  notes?: string;
  whatsappMessage: string;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  status?: string;
  message?: string;
}

// Ensure you use VITE_ prefix for Vite apps
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://admin.highspirits.au';

export const createOrder = async (orderData: OrderPayload): Promise<OrderResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Strapi error payload:', errorData);
      
      let message = `HTTP error! status: ${response.status}`;
      if (errorData?.error?.details?.errors?.length > 0) {
        message = errorData.error.details.errors.map((e: any) => e.message).join(' ');
      } else if (errorData?.error?.message) {
        message = errorData.error.message;
      } else if (errorData?.message) {
        message = errorData.message;
      }
      
      throw new Error(message);
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error creating order in Strapi:', error);
    throw new Error(error.message || 'Unable to place your order. Please try again.');
  }
};
