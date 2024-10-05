export interface CartItem {
    userId: String,
    pizzaId: String,
    pizzaName: String,
    pizzaPrice: number,
    totalPizzaPrice?: number,
    pizzaImage: String,
    pizzaQuantity: number,
    pizzaDescription: String
    isSelected?: boolean
}